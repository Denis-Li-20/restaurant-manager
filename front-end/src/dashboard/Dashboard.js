import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import timeReformat from "../utils/timeReformat";
const axios = require("axios");

function Dashboard({ backEndServerUrl }) {
  const today = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
  const [reservations, setReservations] = useState([]);
  const [reservationsRender, setReservationsRender] = useState([]);
  const [tables, setTables] = useState([]);
  const [tablesRender, setTablesRender] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const queryParameters = new URLSearchParams(useLocation().search);
  const queryDate = queryParameters.get("date");
  const history = useHistory();
  
  // updating "selectedDate" from the query parameter
  useEffect(() => {
    if(queryDate && queryDate !== selectedDate) {
      setSelectedDate(queryParameters.get("date"));
    } else {
      setSelectedDate(today);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // updating reservations and tables on "selectedDate" change
  useEffect(() => {
    async function getData () {
      const listReservationsUrl = `${backEndServerUrl}/reservations?date=${selectedDate}`;
      await axios.get(listReservationsUrl).then((response) => {
        setReservations(response.data.data);
      });
      const listTablesUrl = `${backEndServerUrl}/tables`;
      await axios.get(listTablesUrl).then((response) => {
        setTables(response.data.data);
      });
    }
    if(selectedDate) getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  // constructing elements from server reservations
  useEffect(() => {
    // cancelling reservation
    const cancelClickHandler = async (reservation_id) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }
      const cancelReservationsUrl = `${backEndServerUrl}/reservations/${reservation_id}/status`
      await axios.put(cancelReservationsUrl, {data: { status: "cancelled" }}, config);
      history.go(0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    // building reservations elements based on reservation status
    let resList = [];
    for (let i = 0; i < reservations.length; i++) {
      const res = reservations[i];
      let reservationStatusRender;
      // reservations status': booked, seated, finished, cancelled
      // booked reservation contains all three buttons (Seat, Edit, Cancel)
      if (res.status === "booked") {
        reservationStatusRender = (
          <div className="small-buttons-container">
            <button onClick={() => history.push(`/reservations/${res.reservation_id}/seat`)}
              className="button seat" href={`/reservations/${res.reservation_id}/seat`} 
              value={`${res.reservation_id}`}>Seat</button>
            <button onClick={() => history.push(`/reservations/${res.reservation_id}/edit`)}
              className="button edit" href={`/reservations/${res.reservation_id}/edit`}>Edit</button>
            <button onClick={() => {
              if (window.confirm(`Do you want to cancel this reservation? This cannot be undone.`)) {
                cancelClickHandler(res.reservation_id);
              }
            }}  data-reservation-id-cancel={res.reservation_id} 
                className="button cancel">Cancel</button>
          </div>
        )
      }
      // seated reservation contains only 1 button (Cancel)
      else if (res.status === "seated") {
        reservationStatusRender = (
          <div>
            <p data-reservation-id-status={res.reservation_id}>Reservation is {res.status}</p>
            <div className="small-buttons-container">
            <button onClick={() => {
              if (window.confirm(`Do you want to cancel this reservation? This cannot be undone.`)) {
                cancelClickHandler(res.reservation_id);
              }
            }}  data-reservation-id-cancel={res.reservation_id} 
                className="button cancel">Cancel</button>
            </div>
          </div>
        )
      }

      // render reservations that are NOT cancelled or finished
      if (res.status !== "cancelled" && res.status !== "finished") {
        resList.push(
          <div key={i} className="dashboard-reservation">
            <p className="primary-information">{`${res.first_name} ${res.last_name}`}</p>
            <p className="secondary-information" data-reservation-id-status={res.reservation_id}>{`${timeReformat(res.reservation_time)} - ${res.status}`}</p>
            <p className="unimportant-information">{`${res.people} - people`}</p>
            {reservationStatusRender}
          </div>
        )
      }
    }
    setReservationsRender(resList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations]);

  // constructing elements from server tables
  useEffect(() => {
    let renderElements = [];
    
    const finishConfirmationButtonHandler = async (table_id) => {
      // sending "table finished" request to the server, this will modify both reservations / tables
      const finishReservationUrl = `${backEndServerUrl}/tables/${table_id}/seat`;
      await axios.delete(finishReservationUrl);
      // updating reservations
      const listReservationsUrl = `${backEndServerUrl}/reservations?date=${selectedDate}`;
      await axios.get(listReservationsUrl).then((response) => {
        setReservations(response.data.data);
      });
      // updating tables
      const listTablesUrl = `${backEndServerUrl}/tables`;
      await axios.get(listTablesUrl).then((response) => {
        setTables(response.data.data);
      });
    }
    
    // iterating through "tables" to generate elements
    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      let tableOccupied;
      !table.reservation_id ? tableOccupied = "free" : tableOccupied = "occupied";
      let buttons = <p></p>;
      // adding button for occupied tables, the button will prompt confirmation window
      if (tableOccupied === "occupied") {
        buttons = (
          <div className="small-buttons-container">
            <button data-table-id-finish={table.table_id} onClick={(event) => {
              if (window.confirm('Is this table ready to seat new guests?')) {
                finishConfirmationButtonHandler(table.table_id);
                }
              }}  type="button" className="button finish">Finish occupied table</button>
              </div>
        )
      }
      renderElements.push(
        <div key={i}>
          <p data-table-id-status={table.table_id}>{`Table ${table.table_name} (${table.capacity} people): ${tableOccupied}`}</p>
          {buttons}
        </div>
      )
    }
    setTablesRender(renderElements);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables]);

  // handler for previousDay, today, and nextDay buttons
  const changeDayClickHandler = (command) => {
    // next day should be based on "selectedDate", not "today"
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
            {reservationsRender}
          </div>
        </div>

        <div className="column-right">
          <h4 className="dashboard-title">Tables</h4>
          <div className="dashboard-data">
            {tablesRender}
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
