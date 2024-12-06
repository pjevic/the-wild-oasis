/** @format */

import styled from "styled-components";

const StyledSidebar = styled.aside`
  background-color: var(--color-gray-0);
  padding: 3.2rem 2.4rem;
  border: 1px solid var(--color-gray-100);

  grid-row: 1 / -1;
`;

function Sidebar() {
  return <StyledSidebar>SIDEBAR</StyledSidebar>;
}

export default Sidebar;
