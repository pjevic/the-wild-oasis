/** @format */

import { useState } from "react";
import { useForm } from "react-hook-form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import DatePickerWrapper from "../../ui/DatePickerWrapper";

import styled from "styled-components";

// Styled Components
const Row = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const StyledSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  margin-bottom: 2rem;

  label {
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-gray-800);
    width: 15rem;
  }

  select {
    background-color: var(--color-gray-50);
    border: 1px solid var(--color-gray-300);
    padding: 0.8rem;
    border-radius: var(--border-radius-sm);
    font-size: 1.3rem;
    color: var(--color-gray-800);
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
      outline: none;
      border-color: var(--color-brand-600);
      box-shadow: var(--shadow-sm);
    }

    &:hover {
      border-color: var(--color-brand-500);
    }

    &:disabled {
      background-color: var(--color-gray-200);
      color: var(--color-gray-500);
      cursor: not-allowed;
    }

    option {
      font-size: 1.4rem;
      color: var(--color-gray-800);
    }
  }

  p {
    margin-top: 0.4rem;
    font-size: 1.2rem;
    color: var(--color-gray-600);
  }
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  gap: 4rem;
`;

// Utility to calculate max end date
const calculateMaxEndDate = (startDate, days = 90) => {
  if (!startDate) return null;
  const maxEndDate = new Date(startDate);
  maxEndDate.setDate(startDate.getDate() + days);
  return maxEndDate;
};

// Reusable Date Picker Field
function DateField({ label, selected, onChange, minDate, maxDate, placeholder }) {
  return (
    <DatePickerWrapper>
      <h2>{label}</h2>
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="dd-MM-yyyy"
        placeholderText={placeholder}
        isClearable
        minDate={minDate}
        maxDate={maxDate}
      />
    </DatePickerWrapper>
  );
}

function CreateBookingForm() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guestNum, setGuestNum] = useState("");

  const { register } = useForm();

  function handleCabinReset(e) {
    e.preventDefault();
    setStartDate(null);
    setEndDate(null);
    setGuestNum("");
  }

  // Generate options for guest capacity
  const maxCapacity = 10;
  const guestOptions = Array.from({ length: maxCapacity }, (_, index) => index + 1);

  function handleAvailability(e) {
    e.preventDefault();
  }

  function handleOnsubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Form>
        <FormRow>
          <Heading as="h1">New booking</Heading>
        </FormRow>
        <FormRow>
          <Heading as="h2">Cabin data</Heading>
        </FormRow>
        <Box>
          {/* Start Date */}
          <DateField
            label="Start Date"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setEndDate(null); // Reset end date when start date changes
            }}
            minDate={new Date()}
            placeholder="Select date"
          />

          {/* End Date */}
          <DateField
            label="End Date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            maxDate={calculateMaxEndDate(startDate)}
            placeholder="Select date"
          />

          <StyledSelectWrapper>
            <label htmlFor="numGuests">Guests</label>
            <select
              id="numGuests"
              value={guestNum}
              onChange={(e) => setGuestNum(e.target.value)}
            >
              <option> --- </option>
              {guestOptions.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </StyledSelectWrapper>
        </Box>

        <FormRow>
          <Button variation="secondary" onClick={handleCabinReset}>
            Reset
          </Button>
          <Button>Check availability</Button>
        </FormRow>
      </Form>

      <Form>
        <FormRow>
          <Heading as="h2">Guest data</Heading>
        </FormRow>

        <FormRow label="Full name">
          <Input type="text" id="fullName" />
        </FormRow>

        <FormRow label="Email">
          <Input type="email" id="email" />
        </FormRow>

        <FormRow label="Country">
          <Input type="text" id="nationality" />
        </FormRow>

        <FormRow label="National ID">
          <Input type="text" id="nationalID" />
        </FormRow>

        <FormRow>
          <Button variation="secondary">Reset</Button>
          <Button>Add new booking</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateBookingForm;
