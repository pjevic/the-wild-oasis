/** @format */

import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { RxValue } from "react-icons/rx";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.
  const checkins = confirmedStays.length;

  // 4. Number of checked in nights / all available nigts (num days * num cabins)
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />

      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<HiOutlineBanknotes />}
      />

      <Stat
        title="Check ins"
        value={checkins}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
      />

      <Stat
        title="Occupancy rate"
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
