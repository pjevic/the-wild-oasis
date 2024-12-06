/** @format */

import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import Heading from "./ui/Heading";
import Button from "./ui/Button";
import Input from "./ui/Input";

const StyledApp = styled.main`
  background-color: orange;
  padding: 2rem;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Check In and Out</Heading>
        <Button>Check In</Button>
        <Button>Check Out</Button>
        <Heading as="h3">Form</Heading>
        <Input placeholder="Number of guests" />
        <Input placeholder="Number of guests" />
      </StyledApp>
    </>
  );
}

export default App;
