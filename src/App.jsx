/** @format */

import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import Row from "./ui/Row";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import Input from "./ui/Input";

const StyledApp = styled.main`
  padding: 2rem;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row>
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Check In and Out</Heading>
              <Button>Check In</Button>
              <Button size="small" variation="secondary">
                Check Out
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading as="h3">Form</Heading>
            <form>
              <Input placeholder="Number of guests" />
              <Input placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
