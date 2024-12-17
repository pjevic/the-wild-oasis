/** @format */

import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Styled wrapper for DatePicker
const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;

  /* Title Styling */
  h2 {
    color: var(--color-gray-800);
    font-size: 1.6rem;
    font-weight: 600;
  }

  /* Calendar container */
  .react-datepicker {
    background-color: var(--color-gray-0);
    border: 1px solid var(--color-gray-300);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);
    color: var(--color-gray-800);
  }

  /* Calendar header background */
  .react-datepicker__header {
    background-color: var(--color-brand-500);
    color: var(--color-brand-50);
    font-size: 1.4rem;
    font-weight: 500;
    border-bottom: 1px solid var(--color-brand-800);
  }

  /* Individual days */
  .react-datepicker__day {
    color: var(--color-gray-800);
    border-radius: var(--border-radius-sm);

    &:hover {
      background-color: var(--color-brand-100);
      color: var(--color-brand-800);
    }
  }

  /* Selected day */
  .react-datepicker__day--selected {
    background-color: var(--color-brand-600);
    color: var(--color-gray-0);
    border-radius: var(--border-radius-sm);
    font-weight: bold;
  }

  .react-datepicker__day--selected:hover {
    background-color: var(--color-brand-700);
    color: var(--color-gray-0);
  }

  /* Today styling */
  .react-datepicker__day--today {
    font-weight: bold;
    color: var(--color-brand-600);
  }

  /* Input field styling */
  .react-datepicker__input-container input {
    background-color: var(--color-gray-50);
    border: 1px solid var(--color-gray-300);
    padding: 0.8rem;
    border-radius: var(--border-radius-sm);
    font-size: 1.4rem;
    color: var(--color-gray-700);
    box-shadow: var(--shadow-sm);

    &:focus {
      outline: none;
      border-color: var(--color-brand-600);
      box-shadow: 0 0 0 3px var(--color-brand-100);
    }
  }
`;

export default DatePickerWrapper;
