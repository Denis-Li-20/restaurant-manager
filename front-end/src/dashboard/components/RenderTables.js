import React, { useEffect, useState } from "react";

function RenderTables (backEndServerUrl, selectedDate, rerender, setRerender) {

  const [tables, setTables] = useState([]);
  const [tablesRenderer, setTablesRenderer] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getData () {
      /*
      const listTablesUrl = `${backEndServerUrl}/tables`;
      await axios.get(listTablesUrl).then((response) => {
        console.log("Tables")
        setTables(response.data.data);
      });
      // this effect depends on rerender which is changed in this line
      // it does not cause the infinite loop due to the if statement below
      setRerender(false);
      */
      
      const listTablesUrl = `${backEndServerUrl}/tables`;
      try {
        const response = await fetch(
          listTablesUrl,
          { signal: abortController.signal}
        );
        const tablesFromAPI = await response.json();
        setTables(tablesFromAPI.data);
      } 
      catch (error) {
        if (error.name === "AbortError") {
          console.log("Get tables request aborted")
        } 
        else {
          throw error;
        }
      }
    }

    if(selectedDate || rerender === true) getData()
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, rerender]);

  useEffect(() => {
    let renderElements = [];
    const abortController = new AbortController();
    const finishConfirmationButtonHandler = async (table_id) => {
      // sending "table finished" request to the server, this will modify both reservations / tables
      const finishReservationUrl = `${backEndServerUrl}/tables/${table_id}/seat`;
      try {
        await fetch (
          finishReservationUrl,
          {
            method: "DELETE",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          }
        );
      }
      catch (error) {
        if (error.name === "AbortError") {
          console.log("Finish table request aborted");
        }
        else {
          throw error;
        }
      }
      // updating tables
      const getTablesUrl = `${backEndServerUrl}/tables`;

      try {
        const tablesResponse = await fetch(
          getTablesUrl,
          { signal: abortController.signal },
        )
        const tablesFromAPI = await tablesResponse.json();
        setTables(tablesFromAPI.data);
        setRerender(true);
      }
      catch (error) {
        if (error.name === "AbortError") {
          console.log("Get tables request aborted");
        }
        else {
          console.log("SHIT")
          throw error;
        }
      }
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
    setTablesRenderer(renderElements);
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables]);
  return (
    <>
      {tablesRenderer}
    </>
  )
}

export default RenderTables;