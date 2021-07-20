import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import RenderReservations from "./components/RenderReservations";
import RenderTables from "./components/RenderTables";

function Dashboard({ backEndServerUrl }) {
  const history = useHistory();
  // this state is used for navigation (previous, today, next) days
  const today = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
  
  const [selectedDate, setSelectedDate] = useState();
  // reading the query parameters, which will be used to change selected date if provided
  const queryParameters = new URLSearchParams(useLocation().search);
  const queryDate = queryParameters.get("date");
  // this state controls whether or not reservations and tables have to be rerendered
  // this happens after the status update
  const [rerender, setRerender] = useState(false);


  // updating "selectedDate" from the query parameter
  useEffect(() => {
    if(queryDate && queryDate !== selectedDate) {
      setSelectedDate(queryParameters.get("date"));
    } else {
      setSelectedDate(today);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // requesting reservations and table components
  const reservations = RenderReservations(backEndServerUrl, selectedDate, rerender, setRerender);
  const tables = RenderTables(backEndServerUrl, selectedDate, rerender, setRerender);

  // handler for previousDay, today, and nextDay buttons
  const changeDayClickHandler = (command) => {
    let date = new Date(selectedDate);
    // setDate is not React useState hook; it is a "Date" method!
    // picking the right handler
    switch (command) {
      case "previousDay":
        date.setDate(date.getDate());
        date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        setSelectedDate(date);
        history.push(`/dashboard?date=${date}`);
        break;
      case "nextDay":
        date.setDate(date.getDate() + 2);
        date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        setSelectedDate(date);
        history.push(`/dashboard?date=${date}`);
        break;
      default:
        setSelectedDate(today);
        history.push(`/dashboard?date=${today}`);
        break;
    }
  }
  return (
    <div className="dashboard">

      <div>
        <h1 className="page-title">Dashboard</h1>
        <h4 className="page-description">Reservations for date {selectedDate}</h4>
        <div className="medium-buttons-container">
              <span onClick={() => changeDayClickHandler("previousDay")} 
                      type="button" className="arrow left"></span>
              <button onClick={() => changeDayClickHandler("today")}
                      type="button" className="button">Today</button>
              <span onClick={() => changeDayClickHandler("nextDay")}
                      type="button" className="arrow right"></span>
        </div>
      </div>

      <div className="row">
        <div className="column-left">
          <h4 className="dashboard-title">Reservations</h4>
          <div className="dashboard-data">
            {reservations}
          </div>
        </div>

        <div className="column-right">
          <h4 className="dashboard-title">Tables</h4>
          <div className="dashboard-data">
            {tables}
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
