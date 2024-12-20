/** @format */

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { getFlagURL } from "../../utils/helpers.js";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import DropDownSelect from "../../ui/DropDownSelect";

function FormAddBooking({ availableCabins, startDate, endDate, numGuests, numNights }) {
  const [selectedCabin, setSelectedCabin] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleCabinSelect = (cabin) => {
    setSelectedCabin(cabin);
    console.log(cabin);
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

  const createNewBookingData = () => {
    return {
      startDate,
      endDate,
      numNights,
      numGuests,
      cabinPrice: selectedCabin.regularPrice,
      extrasPrice: 0,
      totalPrice: (selectedCabin.regularPrice - selectedCabin.discount) * numNights,
      status: "unconfirmed",
      hasBreakfasr: false,
      isPaid: false,
      observations: "",
      cabinID: selectedCabin.id,
    };
  };

  const onSubmit = (data) => {
    const newGuestData = createNewGuestData(data);
    const newBookingData = createNewBookingData();
    console.log(newGuestData);
    console.log(newBookingData);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <DropDownSelect
          cabins={availableCabins}
          numNights={numNights}
          onSelect={handleCabinSelect}
          disabled={!availableCabins && !selectedCabin}
        />
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
