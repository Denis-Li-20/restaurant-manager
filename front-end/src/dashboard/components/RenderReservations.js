import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import timeReformat from "../../utils/timeReformat";

function RenderReservations (backEndServerUrl, selectedDate, rerender, setRerender) {
  const [reservations, setReservations] = useState([]);
  const [reservationsRenderer, setReservationsRenderer] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const abortController = new AbortController();
    async function getData () {
      /*
      const abortController = new AbortController();
      const listReservationsUrl = `${backEndServerUrl}/reservations?date=${selectedDate}`;
      await axios.get(listReservationsUrl).then((response) => {
        setReservations(response.data.data);
      });
      // this effect depends on rerender which is changed in this line
      // it does not cause the infinite loop due to the if statement below
      setRerender(false); 
      */
      const listReservationsUrl = `${backEndServerUrl}/reservations?date=${selectedDate}`;

      try {
        const response = await fetch(
          listReservationsUrl,
          { signal: abortController.signal},
        );
        const reservationsFromAPI = await response.json();
        setReservations(reservationsFromAPI.data);
      } 
      catch (error) {
        if (error.name === "AbortError") {
          console.log("Get reservations request aborted");
        } 
        else {
          throw error;
        }
      }

      // this effect depends on rerender which is changed in this line
      // it does not cause the infinite loop due to the if statement below
      setRerender(false); 
    }
    // requesting data when the component mount (selected data is provided)
    // OR
    // when rerendering is triggered from one of the handlers
    if(selectedDate || rerender === true) getData()
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, rerender]);

  useEffect(() => {
    const abortController = new AbortController();
    // cancelling reservation
    const cancelClickHandler = async (reservation_id) => {
      const cancelReservationUrl = `${backEndServerUrl}/reservations/${reservation_id}/status`
      try {
        await fetch (
          cancelReservationUrl,
          {
            method: 'PUT',
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: { status: "cancelled"}}),
          },
          { signal: abortController.signal },
        );
        setRerender(true);
        history.push(`/dashboard?date=${selectedDate}`);
      }
      catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        }
        else {
          throw error;
        }
      }
    }
    // building reservations elements based on reservation status
    let rendererElements = [];
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
        rendererElements.push(
          <div key={res.reservation_id} className="dashboard-reservation">
            <p className="primary-information">{`${res.first_name} ${res.last_name}`}</p>
            <p className="secondary-information" data-reservation-id-status={res.reservation_id}>{`${timeReformat(res.reservation_time)} - ${res.status}`}</p>
            <p className="unimportant-information">{`${res.people} - people`}</p>
            {reservationStatusRender}
          </div>
        )
      }
    }
    setReservationsRenderer(rendererElements);
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations]);
  return (
    <>
      {reservationsRenderer}
    </>
  )
}

export default RenderReservations;