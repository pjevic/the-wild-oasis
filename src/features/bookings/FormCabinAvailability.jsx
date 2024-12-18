/** @format */

import { useForm } from "react-hook-form";
import styled from "styled-components";
import { calculateMaxEndDate } from "../../utils/helpers";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import CustomDatePicker from "../../ui/CustomDatePicker";
import CustomSelect from "../../ui/CustomSelect";
import { useSettings } from "../settings/useSettings";
import { useCabins } from "../cabins/useCabins";

const Box = styled.div`
  width: 100%;
  display: flex;
  gap: 4rem;
`;

function FormCabinAvailability() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const { cabins } = useCabins();
  const { settings } = useSettings();

  const maxBookingLength = settings?.maxBookingLength;

  let maxCapacity = -Infinity;
  cabins?.forEach((cabin) => {
    if (cabin.maxCapacity > maxCapacity) {
      maxCapacity = cabin.maxCapacity;
    }
  });
  const guestOptions = Array.from({ length: maxCapacity }, (_, index) => index + 1);

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    console.log(data.startDate);
    console.log(data.startDate.toISOString());
    // Perform actions with the form data
  };

  const handleCabinReset = () => {
    reset(); // Resets all form values
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Heading as="h1">New booking</Heading>
      </FormRow>
      <FormRow>
        <Heading as="h2">Cabin data</Heading>
      </FormRow>
      <Box>
        {/* Start Date */}
        <CustomDatePicker
          label="Start Date"
          selected={startDate}
          {...register("startDate", { required: "Start Date is required" })}
          onChange={(date) => {
            setValue("startDate", date, { shouldValidate: true });
            setValue("endDate", null);
          }}
          minDate={new Date()}
          placeholder="Select start date"
        />
        {errors.startDate && <p>{errors.startDate.message}</p>}

        {/* End Date */}
        <CustomDatePicker
          label="End Date"
          selected={endDate}
          {...register("endDate", { required: "End Date is required" })}
          onChange={(date) => setValue("endDate", date, { shouldValidate: true })}
          minDate={startDate ? new Date(startDate) : new Date()}
          maxDate={startDate ? calculateMaxEndDate(startDate, maxBookingLength) : null}
          placeholder="Select end date"
        />
        {errors.endDate && <p>{errors.endDate.message}</p>}

        {/* Guests */}
        <CustomSelect
          label="Guests"
          id="numGuests"
          value={watch("numGuests")}
          options={guestOptions}
          onChange={(e) =>
            setValue("numGuests", e.target.value, { shouldValidate: true })
          }
        />
        {errors.numGuests && <p>{errors.numGuests.message}</p>}
      </Box>
      <FormRow>
        <Button variation="secondary" type="reset" onClick={handleCabinReset}>
          Reset
        </Button>
        <Button type="submit">Check availability</Button>
      </FormRow>
    </Form>
  );
}

export default FormCabinAvailability;
