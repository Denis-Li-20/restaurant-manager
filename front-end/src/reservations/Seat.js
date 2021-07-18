import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
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
      history.push("/dashboard");
    }
    else {
      // display error message if reservation doesn't fit the table
      setSeatValidation(`This table can't fit ${reservation.people} people!`);
    }
  }

  const handleChange = (event) => {
    setSelectedTableId(event.target.value);
  }

  return (
    <main className="container">
      <h1 className="row justify-content-center">Seat Reservation</h1>
      <h4 className="row justify-content-center">Available Tables</h4>
      <div className="row">
        <div className="col border">
          <div className="col-md-12 text-center">
            <select name="table_id" onChange={handleChange}>
              {tablesOptions}
            </select>
            <button onClick={submitClickHandler} href={`/tables/${selectedTableId}/seat/`} 
              type="submit" className="btn btn-secondary m-1">Submit</button>
            <div style = {{ fontSize: 12, color: "red" }}>{seatValidation}</div>
          </div>
        </div>
      </div>
    </main>  
  );
}

export default Seat;