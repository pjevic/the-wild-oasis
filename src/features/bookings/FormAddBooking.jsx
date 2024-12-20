/** @format */

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { useCreateGuest } from "../guests/useCreateGuest.js";
import { useCreateBooking } from "./useCreateBooking.js";
import { getFlagURL } from "../../utils/helpers.js";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import DropDownSelect from "../../ui/DropDownSelect";

import { getMostRecentlyCreatedGuest } from "../../services/apiGuests.js";
import { getMostRecentlyCreatedBooking } from "../../services/apiBookings.js";

function FormAddBooking({ availableCabins, startDate, endDate, numGuests, numNights }) {
  const { createGuest } = useCreateGuest();
  const { createBooking } = useCreateBooking();

  const [selectedCabin, setSelectedCabin] = useState(null);

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const handleCabinSelect = (cabin) => {
    setSelectedCabin(cabin);
  };

  const createNewGuestData = (data) => {
    return {
      fullName: data.fullName,
      email: data.email,
      nationality: data.nationality,
      nationalID: data.nationalID,
      countryFlag: getFlagURL(data.nationality),
    };
  };

  const createNewBookingData = (id) => {
    return {
      startDate,
      endDate,
      numNights,
      numGuests,
      cabinPrice: selectedCabin.regularPrice,
      extrasPrice: 0,
      totalPrice: (selectedCabin.regularPrice - selectedCabin.discount) * numNights,
      status: "unconfirmed",
      hasBreakfast: false,
      isPaid: false,
      observations: "",
      cabinID: selectedCabin.id,
      guestID: id,
    };
  };

  const onSubmit = async (data) => {
    const newGuestData = createNewGuestData(data);

    try {
      await createGuest(newGuestData);

      // Fetch the most recently created guest
      const mostRecentGuest = await getMostRecentlyCreatedGuest();
      const id = mostRecentGuest.at(0).id;

      const newBookingData = createNewBookingData(id);
      await createBooking(newBookingData);

      // Fetch the most recently created booking
      const mostRecentBooking = await getMostRecentlyCreatedBooking();
      const bookingID = mostRecentBooking.at(0).id;

      navigate(`/bookings/${bookingID}`);
    } catch (error) {
      console.error("Error during submission:", error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        {availableCabins?.lenght === 0 ? (
          <DropDownSelect
            cabins={availableCabins}
            numNights={numNights}
            onSelect={handleCabinSelect}
            disabled={!availableCabins && !selectedCabin}
          />
        ) : (
          <p>No cabins available </p>
        )}
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "Full name is required." })}
          disabled={!selectedCabin}
        />
      </FormRow>

      <FormRow label="Email">
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address.",
            },
          })}
          disabled={!selectedCabin}
        />
      </FormRow>

      <FormRow label="Country">
        <Input
          type="text"
          id="nationality"
          {...register("nationality", { required: "Country is required." })}
          disabled={!selectedCabin}
        />
      </FormRow>

      <FormRow label="National ID">
        <Input
          type="text"
          id="nationalID"
          {...register("nationalID", { required: "National ID is required." })}
          disabled={!selectedCabin}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="button" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit">Add new booking</Button>
      </FormRow>
    </Form>
  );
}

export default FormAddBooking;
