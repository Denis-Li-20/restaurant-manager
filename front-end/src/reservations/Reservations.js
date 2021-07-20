import React from "react";
import ReservationForm from "./components/ReservationForm";

function NewReservation({ backEndServerUrl }) {
  const rendering = ReservationForm(backEndServerUrl);

  return (
    <>
      <h1 className="page-title">New Reservation</h1>
      {rendering}
    </>
  )
}

export default NewReservation;
