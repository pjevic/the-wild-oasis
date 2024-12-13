/** @format */

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../booking/useBooking";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "../../features/booking/BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

import styled from "styled-components";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading) return <Spinner />;

  const {
    id: bookingID,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;

    checkin(bookingID);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingID}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          value={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice)}.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingID}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
