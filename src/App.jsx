/** @format */

import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.main`
  background-color: orange;
  padding: 2rem;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button>Check In</Button>
        <Button>Check Out</Button>
        <Input placeholder="Number of guests" />
        <Input placeholder="Number of guests" />
      </StyledApp>
    </>
  );
}

export default App;
