/** @format */

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBooking } from "../../services/apiBooking";

export function useBooking() {
  const { bookingID } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", bookingID],
    queryFn: () => getBooking(bookingID),
    // retry: false,
  });

  return { isLoading, booking, error };
}
