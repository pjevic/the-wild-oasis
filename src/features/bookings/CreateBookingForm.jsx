/** @format */
import { useState } from "react";
import { useAvailableCabins } from "./useAvailableCabins";

import FormAddBooking from "./FormAddBooking";
import FormCabinAvailability from "./FormCabinAvailability";

function CreateBookingForm() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numNights, setNumNights] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(1);
  const [numGuests, setNumGuests] = useState(1); // Add state for numGuests

  const { availableCabins, isLoadingAvailableCabins } = useAvailableCabins(
    startDate,
    endDate,
    maxCapacity
  );

  return (
    <>
      <FormCabinAvailability
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setMaxCapacity={setMaxCapacity}
        setNumNights={setNumNights}
        setNumGuests={setNumGuests}
      />
      <FormAddBooking
        availableCabins={availableCabins}
        numNights={numNights}
        startDate={startDate}
        endDate={endDate}
        numGuests={numGuests}
      />
    </>
  );
}

export default CreateBookingForm;
