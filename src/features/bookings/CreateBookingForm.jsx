/** @format */

import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import DatePickerWrapper from "../../ui/DatePickerWrapper";

import Form from "../../ui/Form";
import Button from "../../ui/Button";

// Styled Components
const FormRow = styled.div`
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

const StyledSelect = styled.select`
  border: 2px var(--color-brand-50);
  padding: 8px;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  color: #333;

  &:focus {
    border-color: var(--color-brand-100);
  }
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  color: #555;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

  // Generate options for guest capacity
  const maxCapacity = 10;
  const guestOptions = Array.from({ length: maxCapacity }, (_, index) => index + 1);

  return (
    <Form>
      <FormRow>
        {/* Start Date */}
        <DateField
          label="Start Date"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setEndDate(null); // Reset end date when start date changes
          }}
          minDate={new Date()}
          placeholder="Select a start date"
        />

        {/* End Date */}
        <DateField
          label="End Date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          minDate={startDate}
          maxDate={calculateMaxEndDate(startDate)}
          placeholder="Select an end date"
        />

        {/* Guest Capacity */}
        <StyledLabel>
          Select Maximum Capacity:
          <StyledSelect value={guestNum} onChange={(e) => setGuestNum(e.target.value)}>
            <option value="" disabled>
              -- Number of guests --
            </option>
            {guestOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </StyledSelect>
          {guestNum && <p>Selected Capacity: {guestNum}</p>}
        </StyledLabel>
      </FormRow>

      {/* Display Selected Information */}
      {(startDate || endDate || guestNum) && (
        <div>
          {startDate && <p>Start Date: {startDate.toLocaleDateString("en-GB")}</p>}
          {endDate && <p>End Date: {endDate.toLocaleDateString("en-GB")}</p>}
          {guestNum && <p>Number of Guests: {guestNum}</p>}
        </div>
      )}

      {/* Form Actions */}
      <FormRow>
        <Button variation="secondary">Cancel</Button>
        <Button>Submit</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
