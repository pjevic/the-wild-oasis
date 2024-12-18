/** @format */

import { useState, useEffect } from "react";
import { useAvailableCabins } from "./useAvailableCabins";

import FormAddBooking from "./FormAddBooking";
import FormCabinAvailability from "./FormCabinAvailability";

function CreateBookingForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { availableCabins, isLoadingAvailableCabins } = useAvailableCabins(
    startDate,
    endDate
  );

  useEffect(() => {
    console.log("Effect triggered", startDate, endDate);
  }, [startDate, endDate]);

  return (
    <>
      <FormCabinAvailability setStartDate={setStartDate} setEndDate={setEndDate} />
      <FormAddBooking availableCabins={availableCabins} />
    </>
  );
}

export default CreateBookingForm;
