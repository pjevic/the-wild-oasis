/** @format */

import { useState, useEffect } from "react";
import { useAvailableCabins } from "./useAvailableCabins";

import { subtractDates } from "../../utils/helpers";

import FormAddBooking from "./FormAddBooking";
import FormCabinAvailability from "./FormCabinAvailability";

function CreateBookingForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numNights, setNumNights] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(1);

  // console.log(numNigths);

  const { availableCabins, isLoadingAvailableCabins } = useAvailableCabins(
    startDate,
    endDate,
    maxCapacity
  );

  useEffect(() => {
    console.log("Effect triggered", startDate, endDate);
    if (startDate && endDate) {
      const nights = subtractDates(endDate, startDate);
      setNumNights(nights > 0 ? nights : 0);
    }
  }, [startDate, endDate]);

  return (
    <>
      <FormCabinAvailability
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setMaxCapacity={setMaxCapacity}
      />
      <FormAddBooking availableCabins={availableCabins} numNights={numNights} />
    </>
  );
}

export default CreateBookingForm;
