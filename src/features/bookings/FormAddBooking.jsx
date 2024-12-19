/** @format */

import { useState } from "react";
import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import DropDownSelect from "../../ui/DropDownSelect";

function FormAddBooking({ availableCabins, numNights }) {
  const [selectedCabin, setSelectedCabin] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleCabinSelect = (cabin) => {
    setSelectedCabin(cabin);
  };

  const onSubmit = (data) => {};

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Heading as="h2">Cabin options</Heading>
      </FormRow>

      <FormRow>
        <DropDownSelect
          cabins={availableCabins}
          numNights={numNights}
          onSelect={handleCabinSelect}
          disabled={!availableCabins && !selectedCabin}
        />
      </FormRow>

      <FormRow>
        <Heading as="h2">Guest data</Heading>
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
