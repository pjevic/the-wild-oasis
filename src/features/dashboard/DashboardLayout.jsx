/** @format */

import { useCabins } from "../cabins/useCabins";
import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBookings";

import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodaysActivity from "../../features/check-in-out/TodaysActivity";

import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoading1, cabins } = useCabins();
  const { isLoading: isLoading2, bookings } = useRecentBookings();
  const { isLoading: isLoading3, confirmedStays, numDays } = useRecentStays();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        numDays={numDays}
        bookings={bookings}
        cabinCount={cabins.length}
        confirmedStays={confirmedStays}
      />
      <TodaysActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
