/** @format */

import { useState } from "react";
import styled from "styled-components";

import { formatCurrency } from "../utils/helpers";

const DropDownWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 70rem;
`;

const DropDownButton = styled.button`
  outline: none;
  width: 100%;
  padding: 1rem;
  color: var(--color-gray-700);
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-300);
  border-radius: 5px;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ disabled }) =>
    disabled ? "var(--color-gray-200)" : "var(--color-gray-50)"};

  display: flex;
  text-align: left;
  justify-content: space-between;
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 30rem;
  overflow-y: auto;
  list-style: none;
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-300);
  border-radius: 5px;
  z-index: 10;
`;

const OptionItem = styled.li`
  padding: 1rem;
  gap: 2rem;
  border-bottom: 1px solid var(--color-gray-300);
  cursor: pointer;

  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const OptionImage = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 5px;
`;

const OptionDetails = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const OptionName = styled.p`
  color: var(--color-gray-900);
  font-size: 1.4rem;
  font-weight: bold;
`;

const OptionDetail = styled.p`
  font-size: 1.4rem;
  color: var(--color-gray-900);
`;

const TotalDetail = styled.p`
  font-size: 1.4rem;
  color: var(--color-gray-900);
  margin-left: auto;
  margin-right: 1rem;
`;

function DropDownSelect({ cabins, numNights, onSelect, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (cabin) => {
    setSelectedCabin(cabin);
    setIsOpen(false);
    if (onSelect) onSelect(cabin);
  };

  console.log(numNights);

  return (
    <DropDownWrapper>
      <DropDownButton onClick={toggleDropdown} disabled={disabled}>
        {selectedCabin ? selectedCabin.name : "Select a cabin"}
        <span>{isOpen ? "▲" : "▼"}</span>
      </DropDownButton>

      {isOpen && (
        <OptionsList>
          {cabins.map((cabin) => {
            const discount = cabin.discount || 0;

            return (
              <OptionItem key={cabin.id} onClick={() => handleSelect(cabin)}>
                <OptionImage src={cabin.image} alt={cabin.name} />
                <OptionDetails>
                  <OptionName>{cabin.name}</OptionName>
                  <OptionDetail>Capacity: {cabin.maxCapacity}</OptionDetail>
                  <OptionDetail>
                    Price: {formatCurrency(cabin.regularPrice)}
                  </OptionDetail>
                  <OptionDetail>
                    {discount > 0 && <>Discount: {formatCurrency(cabin.discount)}</>}
                  </OptionDetail>
                  <TotalDetail>
                    Total:{" "}
                    {formatCurrency((cabin.regularPrice - cabin.discount) * numNights)}
                  </TotalDetail>
                </OptionDetails>
              </OptionItem>
            );
          })}
        </OptionsList>
      )}
    </DropDownWrapper>
  );
}

export default DropDownSelect;
