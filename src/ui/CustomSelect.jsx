/** @format */

import { forwardRef } from "react";
import styled from "styled-components";

const StyledSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  margin-bottom: 2rem;

  label {
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--color-gray-800);
    width: 15rem;
    margin-top: 1rem;
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

const CustomSelect = forwardRef(({ label, id, value, options, onChange }, ref) => {
  return (
    <StyledSelectWrapper>
      <label htmlFor={id}>{label}</label>
      <select ref={ref} id={id} value={value} onChange={onChange}>
        <option value=""> --- </option>
        {options.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </StyledSelectWrapper>
  );
});

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
