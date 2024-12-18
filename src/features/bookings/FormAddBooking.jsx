/** @format */

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function FormAddBooking() {
  return (
    <Form>
      <FormRow>
        <Heading as="h2">Guest data</Heading>
      </FormRow>

      <FormRow label="Full name">
        <Input type="text" id="fullName" />
      </FormRow>

      <FormRow label="Email">
        <Input type="email" id="email" />
      </FormRow>

      <FormRow label="Country">
        <Input type="text" id="nationality" />
      </FormRow>

      <FormRow label="National ID">
        <Input type="text" id="nationalID" />
      </FormRow>

      <FormRow>
        <Button variation="secondary">Reset</Button>
        <Button>Add new booking</Button>
      </FormRow>
    </Form>
  );
}

export default FormAddBooking;
