/** @format */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useCabins } from "../cabins/useCabins";
import { useSettings } from "../settings/useSettings";
import { calculateMaxEndDate, subtractDates } from "../../utils/helpers";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import CustomDatePicker from "../../ui/CustomDatePicker";
import CustomSelect from "../../ui/CustomSelect";

const Box = styled.div`
  width: 100%;
  display: flex;
  gap: 4rem;
`;

function FormCabinAvailability({
  setStartDate,
  setEndDate,
  setMaxCapacity,
  setNumNights,
  setNumGuests,
}) {
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
  const numGuests = watch("numGuests");

  useEffect(() => {
    if (startDate && endDate) {
      const nights = subtractDates(endDate.toISOString(), startDate.toISOString());
      setNumNights(nights > 0 ? nights : 0);
    }
  }, [startDate, endDate, setNumNights]);

  useEffect(() => {
    if (numGuests) {
      setNumGuests(numGuests);
    }
  }, [numGuests, setNumGuests]);

  const onSubmit = (data) => {
    setStartDate(data.startDate.toISOString().slice(0, -5));
    setEndDate(data.endDate.toISOString().slice(0, -5));
    setMaxCapacity(data.numGuests);
    setNumGuests(data.numGuests);
  };

  const handleCabinReset = () => {
    setStartDate("");
    setEndDate("");
    setMaxCapacity(0);
    setNumNights(0);
    setNumGuests(0);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Heading as="h5">New booking</Heading>
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
          value={numGuests}
          options={guestOptions}
          {...register("numGuests", { required: "Number of guests is required" })}
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
        <Button type="submit" disabled={!startDate || !endDate || !numGuests}>
          Check availability
        </Button>
      </FormRow>
    </Form>
  );
}

export default FormCabinAvailability;
