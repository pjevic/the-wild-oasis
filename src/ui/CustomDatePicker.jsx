/** @format */

import React, { forwardRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Styled wrapper for DatePicker
const StyledDatePicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  /* Title Styling */
  h2 {
    color: var(--color-gray-800);
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  /* Input field styling */
  .react-datepicker__input-container input {
    background-color: var(--color-gray-50);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--border-radius-sm);
    padding: 0.8rem;
    font-size: 1.4rem;
    color: var(--color-gray-700);
    outline: none;

    &:focus {
      border-color: var(--color-brand-600);
    }
  }

  /* Calendar container */
  .react-datepicker {
    background-color: var(--color-gray-0);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);
    color: var(--color-gray-800);
  }

  /* Calendar header */
  .react-datepicker__header {
    background-color: var(--color-brand-500);
    color: var(--color-brand-50);
    font-size: 1.4rem;
    font-weight: 500;
    border-bottom: 1px solid var(--color-brand-800);
  }

  .react-datepicker__current-month {
    color: var(--color-brand-50);
    font-size: 1.4rem;
  }

  .react-datepicker__day-name {
    color: var(--color-brand-200);
  }

  /* Day styling */
  .react-datepicker__day {
    color: var(--color-gray-800);
    border-radius: var(--border-radius-sm);
  }

  /* Hover states for enabled days */
  .react-datepicker__day:not([aria-disabled="true"]):hover {
    background-color: var(--color-brand-100);
    color: var(--color-brand-800);
  }

  .react-datepicker__day--today {
    background-color: var(--color-brand-200);
    color: var(--color-brand-600);
    font-weight: bold;
  }

  .react-datepicker__day--today:hover {
    background-color: var(--color-brand-500);
    color: var(--color-brand-50);
  }

  /* Selected day */
  .react-datepicker__day--selected {
    background-color: var(--color-brand-600);
    color: var(--color-gray-0);
    font-weight: bold;
  }

  .react-datepicker__day--selected:hover {
    background-color: var(--color-brand-700);
  }

  /* Disabled days */
  .react-datepicker__day--disabled {
    background-color: var(--color-gray-200);
    color: var(--color-gray-900);
    text-decoration: line-through;
  }

  /* Hover states for various selectors */
  .react-datepicker__day:not([aria-disabled="true"]):hover,
  .react-datepicker__month-text:not([aria-disabled="true"]):hover,
  .react-datepicker__quarter-text:not([aria-disabled="true"]):hover,
  .react-datepicker__year-text:not([aria-disabled="true"]):hover {
    background-color: var(--color-brand-700);
    color: var(--color-gray-0);
    font-weight: bold;
  }
`;

// CustomDatePicker Component with forwardRef
const CustomDatePicker = forwardRef(
  ({ label, selected, onChange, minDate, maxDate, placeholder }, ref) => {
    return (
      <StyledDatePicker>
        {label && <h2>{label}</h2>}
        <DatePicker
          selected={selected}
          onChange={onChange}
          dateFormat="dd-MM-yyyy"
          placeholderText={placeholder}
          isClearable
          minDate={minDate}
          maxDate={maxDate}
          ref={ref} // Forward the ref to the DatePicker
        />
      </StyledDatePicker>
    );
  }
);

// Add display name for the component
CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;
