/** @format */

import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout.js";
import { useDeleteBooking } from "./useDeleteBooking.js";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal.jsx";

import styled from "styled-components";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { status, id: bookingID } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingID}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingID}`)}>Check in</Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingID)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeletingBooking}
              onConfirm={() =>
                deleteBooking(bookingID, { onSettled: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
