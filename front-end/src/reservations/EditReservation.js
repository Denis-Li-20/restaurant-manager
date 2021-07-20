import React from "react";
import { useParams } from "react-router-dom";
import ReservationForm from "./components/ReservationForm";


function EditReservation({ backEndServerUrl }) {
  const { reservation_id } = useParams();
  // ReservationsForm output depends on provided parameters
  // Whenever reservation_id is provided - form will be filled by the existing data
  const rendering = ReservationForm(backEndServerUrl, reservation_id);

  return (
    <>
      <h1 className="page-title">Edit Reservation</h1>
      {rendering}
    </>
  )
}

export default EditReservation;
