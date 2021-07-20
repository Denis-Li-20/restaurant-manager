import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import DateReformat from "../utils/dateReformat";
const axios = require("axios");

function Seat({ backEndServerUrl }) {
  const history = useHistory();
  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const [tablesOptions, setTablesOptions] = useState([]);
  const [seatValidation, setSeatValidation] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState();
  const { reservation_id } = useParams();

  // retrieving list of available tables
  useEffect(() => {
    async function getData () {
      /*
      const getReservationUrl = `${backEndServerUrl}/reservations/${reservation_id}`;
      await axios.get(getReservationUrl).then((response) => {
        setReservation(response.data.data);
      });
      const listTablesUrl = backEndServerUrl + `/tables`;
      await axios.get(listTablesUrl).then((response) => {
        let tablesResponse = response.data.data;
        // filtering the results (only free tables)
        setSelectedTableId(tablesResponse.filter((table) => !table.reservation_id)[0].table_id);
        setTables(tablesResponse);
      });
      */
      const abortController = new AbortController();
      const getReservationUrl = `${backEndServerUrl}/reservations/${reservation_id}`;

      try {
        const resResponse = await fetch (
          getReservationUrl, 
          {signal: abortController.signal},
          )
        const reservationFromAPI = await resResponse.json();
        setReservation(reservationFromAPI.data);
      }
      catch (error) {
        if (error.name === "AbortError") {
          console.log("Get reservation request aborted");
        }
        else {
          throw error;
        }
      }

      const getTablesUrl = `${backEndServerUrl}/tables`;

      try {
        const tablesResponse = await fetch (
          getTablesUrl,
          {signal: abortController.signal},
        )
        const tablesFromAPI = await tablesResponse.json();
        setSelectedTableId(tablesFromAPI.data.filter((table) => !table.reservation_id)[0].table_id);
        setTables(tablesFromAPI.data);
      }
      catch (error) {
        if (error.name === "AbortError") {
          console.log("Get tables request aborted");
        }
        else {
          throw error;
        }
      }
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[reservation_id]);

  // generating elements from server data
  useEffect(() => {
    let renderElements = [];
    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];

      // show only "free" tables
      if (!table.reservation_id) {
        renderElements.push(
          <option key={table.table_id} value={table.table_id}>{`${table.table_name} - ${table.capacity}`}</option>
        )
      }
    }
    setTablesOptions(renderElements);
  }, [reservation, tables, seatValidation, history, reservation_id]);

  const submitClickHandler = async (event) => {
    let table = tables.find((table) => table.table_id === Number(selectedTableId));
    if (table.capacity >= reservation.people) {
      event.preventDefault();
      const seatReservationUrl = `${backEndServerUrl}/tables/${selectedTableId}/seat`;
      await axios.put(seatReservationUrl, {data: { reservation_id: reservation_id }});
      history.push(`/dashboard?date=${DateReformat(reservation.reservation_date)}`);
    }
    else {
      // display error message if reservation doesn't fit the table
      setSeatValidation(<p className="warning-message alert alert-danger">This table can't fit {reservation.people} people!</p>);
    }
  }

  const handleChange = (event) => {
    setSelectedTableId(event.target.value);
  }

  return (
    <>
      <h1 className="page-title">Seat Reservation</h1>
      <h4 className="page-description">Available Tables</h4>
      <div className="form form-input">
          <select name="table_id" onChange={handleChange}>
            {tablesOptions}
          </select>
          <div style = {{ fontSize: 12, color: "red" }}>{seatValidation}</div>
          <div className="medium-buttons-container">
            <button onClick={submitClickHandler} href={`/tables/${selectedTableId}/seat/`} 
              type="submit" className="button form-submit">Submit</button>
          </div>
      </div>
    </>  
  );
}

export default Seat;