/** @format */

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

import { useCabins } from "../cabins/useCabins";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

import styled from "styled-components";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { cabins, isLoading: isLoading3 } = useCabins();
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        numDays={numDays}
        bookings={bookings}
        cabinCount={cabins.length}
        confirmedStays={confirmedStays}
      />
      <div>TODAYS ACTIVITY</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
