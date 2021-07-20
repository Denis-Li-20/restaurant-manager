import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DateValidation from "../../utils/dateValidation";
import DateReformat from "../../utils/dateReformat";
import TimeValidation from "../../utils/timeValidation";
import TimeReformat from "../../utils/timeReformat";
const axios = require("axios");

function ReservationForm( backEndServerUrl, reservation_id ) {
  const history = useHistory();
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    // filling in the form if the reservation_id was provided
    if (reservation_id) {
      const getReservationUrl = `${backEndServerUrl}/reservations/${reservation_id}`;
      axios.get(getReservationUrl).then((response) => {
        const res = response.data.data;
        // reformatting date and time
        let date = res.reservation_date.slice(0,10);
        let time = res.reservation_time.slice(0,5);
        setFormData({
          first_name: res.first_name, 
          last_name: res.last_name,
          mobile_number: res.mobile_number,
          reservation_date: date, 
          reservation_time: time,
          people: res.people,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function FormValidation() {
    // adding all errors to "errors" object
    const errors = {};
    const formKeys = Object.keys(formData);
    // this object required for error messages (Xxx Xxx instead of xxx_xxx)
    const formKeysErrorNames = {
      first_name: "First Name",
      last_name: "Last Name",
      mobile_number: "Mobile Number",
      reservation_date: "Reservation Date",
      reservation_time: "Reservation Time",
      people: "People",
    };

    const formDataNoSpaces = {};
    formKeys.forEach((key) => {
      if (key !== "people") formDataNoSpaces[key] = formData[key].replace(" ", "");
    })
    // must not be empty validation
    formKeys.forEach((key) => {
      if(formDataNoSpaces[key] === "") {
        errors[key] = `${formKeysErrorNames[key]} should not be empty!`;
      }
    })

    // prioritizing "should not be empty" message over date validation
    const dateValidationMessage = DateValidation(formData.reservation_date);
    if (dateValidationMessage !== "" && !errors["reservation_date"]) {
      errors["reservation_date"] = dateValidationMessage;
    };
    // prioritizing "should not be empty" message over time validation
    const timeValidationMessage = TimeValidation(formData.reservation_date, TimeReformat(formData.reservation_time));
    if (timeValidationMessage !== "" && !errors["reservation_time"]) {
      errors["reservation_time"] = timeValidationMessage;
    };

    if(Object.keys(errors).length > 0) {
      for (const error in errors) {
        errors[error] = (
          <div className="warning-message alert alert-danger" role="alert">{errors[error]}</div>
        )
      }
      setFormValidation({...errors});
      return false;
    } else {
      setFormValidation({});
      return true;
    }
  }
  // constraining mobile number input to numbers only and auto-reformatting the input
  const onMobileNumberChange = (value, previousValue) => {
    // return nothing if no value
    if (!value) return value; 
    // only allows 0-9 inputs
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length; 
    if (!previousValue || value.length > previousValue.length) {
      // returns: "x", "xx", "xxx"
      if (cvLength < 4) return currentValue; 
      // returns: "xxx", "xxx-x", "xxx-xx", "xxx-xxx",
      if (cvLength < 7) return `${currentValue.slice(0, 3)}-${currentValue.slice(3)}`; 
      // returns: "xxx-xxx-", "xxx-xxx-x", "xxx-xxx-xx", "xxx-xxx-xxx", "xxx-xxx-xxxx"
      return `${currentValue.slice(0, 3)}-${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`; 
    }
  }
  // constraining people input to [1-6] only
  const onPeopleChange = (value, previousValue) => {
    value = String(value); // arguments are of INT type
    previousValue = String(previousValue); // arguments are of INT type  
    if (!value) return value; // return nothing if no value
    const currentValue = value.replace(/[^\d]/g, ''); // allows digits only
    if (currentValue === "") return "";
    return parseInt(currentValue);
  }
  // picking the right handler for each type of input
  const handleChange = ({target}) => {
    switch (target.name) {
      case "mobile_number":
        setFormData(previousState => ({
          ...formData,
          mobile_number: onMobileNumberChange(target.value, previousState.mobile_number),
        }));
        break;
      case "people":
        setFormData(previousState => ({
          ...formData,
          people: onPeopleChange(target.value, previousState.people),
        }));
        break;
      case "reservation_date":
        setFormData(newState => ({
          ...formData,
          reservation_date: DateReformat(target.value),
        }));
        break;
      default:
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
        break;
    };
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (FormValidation() === true) {
      const abortController = new AbortController();
      const reservationsUrl = `${backEndServerUrl}/reservations`;

      try {
        await fetch(
          reservationsUrl,
          {
            method: 'POST',
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: formData}),
          },
          { signal: abortController.signal}
        );
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } 
      catch (error) {
        if (error.name === "AbortError") {
          console.log("Reservation post request aborted");
        } 
        else {
          throw error;
        }
      }
    }
  }

  // cancelling inputs returns to the previous page
  const handleCancel = (event) => {
    event.preventDefault();
    history.go(-1);
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
          <label className="form-input label" htmlFor="firstNameControlInput">First Name</label>
          <input className="form-input" type="text" placeholder="First Name" aria-label="First Name" 
              id="first_name" name="first_name" onChange={handleChange} value={formData.first_name}/>
          {formValidation.first_name}

          <label className="form-input label" htmlFor="lastNameControlInput">Last Name</label>
          <input className="form-input" type="text" placeholder="Last Name" aria-label="Last Name"
              id="last_name" name="last_name" onChange={handleChange} value={formData.last_name}/>
          {formValidation.last_name}

          <label className="form-input label" htmlFor="mobileNumberControlInput">Mobile Number</label>
          <input className="form-input" type="text" placeholder="Mobile Number" aria-label="Mobile Number"
              id="mobile_number" name="mobile_number" onChange={handleChange} value={formData.mobile_number}/>
          {formValidation.mobile_number}

          <label className="form-input label" htmlFor="dateControlInput">Date</label>
          <input className="form-input" type="date" 
              placeholder="Date" 
              aria-label="Date"
              id="reservation_date" name="reservation_date" onChange={handleChange} value={formData.reservation_date}/>
          {formValidation.reservation_date}

          <label className="form-input label" htmlFor="timeControlInput">Time</label>
          <input className="form-input" type="time" 
              placeholder="Time"
              aria-label="Time"
              id="reservation_time" name="reservation_time" onChange={handleChange} value={formData.reservation_time}/>
          {formValidation.reservation_time}

          <label className="form-input label" htmlFor="peopleControlInput">Number of People</label>
          <input className="form-input" type="text" placeholder="1-6" aria-label="Number of People"
              id="people" name="people" onChange={handleChange} value={formData.people}/>
          {formValidation.people}
      </form>

      <div className="medium-buttons-container">
        <button className="button form-submit" type="submit" onClick={handleSubmit}>Submit</button>
        <button className="button form-cancel" onClick={handleCancel}>Cancel</button>
      </div>
    </>
  )
}

export default ReservationForm;