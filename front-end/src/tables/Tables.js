import React, {useState} from "react";
import { useHistory } from "react-router-dom";

function Tables({ backEndServerUrl }) {
  const formInitialState = {table_name: "", capacity: ""};
  const [formValidation, setFormValidation] = useState({ table_name: "", capacity: "", reservation_id: ""});
  const [formData, setFormData] = useState({table_name: "", capacity: "", reservation_id: ""});
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (FormValidation() === true) {
      const abortController = new AbortController();
      const createTableUrl = `${backEndServerUrl}/tables`;

      try {
        if (formData.reservation_id === "") {
          await fetch (
            createTableUrl,
            {
              method: 'POST',
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({data: {...formData, reservation_id: null}}),
            },
            { signal: abortController.signal }
          )
        }
        else {
          await fetch (
            createTableUrl,
            {
              method: 'POST',
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({data: formData}),
            },
            { signal: abortController.signal }
          )
        }
        // resetting the forms
        setFormData({...formInitialState});
        setFormValidation({});
        history.push(`/dashboard`);
      }
      catch (error) {
        if (error.name === "AbortError") {
          console.log("Put table request aborted");
        }
        else {
          throw error;
        }
      }
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormData({...formInitialState});
    history.go(-1);
  };

  const handleChange = ({target}) => {
    switch (target.name) {
        case "table_name":
            setFormData({
                ...formData,
                table_name: target.value,
            });
            break;
        case "capacity":
            setFormData({
                ...formData,
                capacity: Number(target.value),
            });
            break;
        case "reservation_id":
            setFormData({
                ...formData,
                reservation_id: Number(target.value),
            });
            break;
        default:
          break;
    }
  }

  function FormValidation() {
    const formKeys = ["table_name","capacity"];
    const formKeysErrorNames = {
        table_name: "Table Name",
        capacity: "Capacity",
    };
    let errors = {};
    formKeys.forEach((key) => {
      // custom validation for each input field type
      if (key === "table_name" && formData[key].length < 2) {
          errors[key] =
              <div className="warning-message alert alert-danger" role="alert">
                  {`${formKeysErrorNames[key]} should be 2 symbols or more!`}
              </div>
      };
      if (key === "capacity" && formData[key] < 1) {
          errors[key] = 
              <div className="warning-message alert alert-danger" role="alert">
                  {`${formKeysErrorNames[key]} should not be zero!`}
              </div>
      };
      const numberOnly = /^\d+$/;
      if (key === "reservation_id" && formData[key] !== "" && formData[key].match(numberOnly)) {
          errors[key] = 
              <div className="warning-message alert alert-danger" role="alert">
                  {`${formKeysErrorNames[key]} should be a number!`}
              </div>
      }
    });
    if (Object.keys(errors).length === 0) {
        return true;
    }
    setFormValidation({...formValidation, ...errors});
    return false;
  }

  return (
      <div>
          <h1 className="page-title">Create New Table</h1>
          <form className="form" onSubmit={handleSubmit}>                    
                  <label className="form-input label" htmlFor="firstNameControlInput">Table Name</label>
                  <input className="form-input" type="text" placeholder="Table Name" aria-label="Table Name" 
                      id="table_name" name="table_name" onChange={handleChange} value={formData.table_name}/>
                  {formValidation.table_name}
                  
                  <label className="form-input label" htmlFor="lastNameControlInput">Table Capacity</label>
                  <input className="form-input" type="text" placeholder="Table Capacity" aria-label="Table Capacity"
                      id="capacity" name="capacity" onChange={handleChange} value={formData.capacity}/>
                  {formValidation.capacity}
                  
                  <label className="form-input label" htmlFor="lastNameControlInput">Reservation ID</label>
                  <input className="form-input" type="text" placeholder="Reservation ID" aria-label="Reservation ID"
                      id="reservation_id" name="reservation_id" onChange={handleChange} value={formData.reservation_id}/>
                  {formValidation.reservation_id}
          </form>

          <div className="medium-buttons-container">
              <button className="button form-submit" type="submit" onClick={handleSubmit}>Submit</button>
              <button className="button form-cancel" onClick={handleCancel}>Cancel</button>
          </div>
      </div>
  )
}

export default Tables;
