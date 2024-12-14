/** @format */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";

import styled from "styled-components";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. LOAD THE AUTHENTICATED USER
  const { isAuthenticated, isLoading } = useUser();

  // 2. If thee is NO authenticated user, redirect to "/login"
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading show a SPINNER
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
