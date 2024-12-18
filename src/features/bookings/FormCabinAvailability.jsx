/** @format */

import { useState } from "react";
import styled from "styled-components";

import { calculateMaxEndDate } from "../../utils/helpers";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import CustomDatePicker from "../../ui/CustomDatePicker";
import CustomSelect from "../../ui/CustomSelect";

const Box = styled.div`
  width: 100%;
  display: flex;
  gap: 4rem;
`;

function FormCabinAvailability() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guestNum, setGuestNum] = useState("");

  function handleCabinReset(e) {
    e.preventDefault();
    setStartDate(null);
    setEndDate(null);
    setGuestNum("");
  }

  // Generate options for guest capacity
  const maxCapacity = 10;
  const guestOptions = Array.from({ length: maxCapacity }, (_, index) => index + 1);

  return (
    <Form>
      <FormRow>
        <Heading as="h1">New booking</Heading>
      </FormRow>
      <FormRow>
        <Heading as="h2">Cabin data</Heading>
      </FormRow>
      <Box>
        {/* Start Date */}
        <CustomDatePicker
          label="Start Date"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setEndDate(null);
          }}
          minDate={new Date()}
          placeholder="Select date"
        />

        {/* End Date */}
        <CustomDatePicker
          label="End Date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          minDate={startDate}
          maxDate={calculateMaxEndDate(startDate)}
          placeholder="Select date"
        />

        {/* Guests */}
        <CustomSelect
          label="Guests"
          id="numGuests"
          value={guestNum}
          options={guestOptions}
          onChange={(e) => setGuestNum(e.target.value)}
        />
      </Box>
      <FormRow>
        <Button variation="secondary" onClick={handleCabinReset}>
          Reset
        </Button>
        <Button>Check availability</Button>
      </FormRow>
    </Form>
  );
}

export default FormCabinAvailability;
