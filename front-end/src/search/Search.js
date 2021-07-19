import React, { useEffect, useState } from "react";
import dateReformat from "../utils/dateReformat";
import timeReformat from "../utils/timeReformat";
const axios = require("axios");

function SearchReservations({backEndServerUrl}) {
  const [reservations, setReservations] = useState([]);
  const [reservationsRender, setReservationsRender] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorsRender, setErrorsRender] = useState("");
  const handleChange = ({target}) => {
    setMobileNumber(previousState => (
     onMobileNumberChange(target.value, previousState.mobile_number)
    ));
  }

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

  const searchHandler = (event) => {
    event.preventDefault();
    //const baseUrl = "http://localhost:5000";
    const findByMobileNumber = backEndServerUrl + `/reservations?mobile_number=${mobileNumber}`;
    axios.get(findByMobileNumber).then((response) => {
      setReservations(response.data.data);
      if(response.data.data.length === 0) {
        setErrorsRender(<div className="warning-message alert alert-danger">No reservations found!</div>)
      } else {
        setErrorsRender();
      }
    })
  }

  useEffect(() => {
    let resList = [];
    for (let i = 0; i < reservations.length; i++) {
      const res = reservations[i];
      resList.push(
        <div key={i} className="search-result">
          <p className="primary-information">{`${res.first_name} - ${res.last_name}`}</p>
          <p className="secondary-information">{`${dateReformat(res.reservation_date).slice(0,10)}: ${timeReformat(res.reservation_time)}`}</p>
          <p className="unimportant-information">{`${res.people} - people`}</p>
        </div>
      )
    }
    setReservationsRender(resList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations]);

  return (
    <div>

      <h1 className="page-title">Search Reservation</h1>

      <form className="form">
        <label className="form-input label">Mobile Number</label>
        <input onChange={handleChange} value={mobileNumber} name="mobile_number" 
          className="form-input" type="text" 
          placeholder="Search by number" aria-label="Search"/>
        {errorsRender}
      </form>

      <div className="medium-buttons-container">
        <button onClick={searchHandler} className="button form-submit" type="submit">Search</button>
      </div>

      <div>
        {reservationsRender}
      </div>

    </div>  
  );
}

export default SearchReservations;