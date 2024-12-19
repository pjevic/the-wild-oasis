/** @format */

import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { getAvailableCabins } from "../../services/apiBookings";

export function useAvailableCabins(startDate, endDate, maxCapacity) {
  const {
    data: availableCabins,
    isLoading: isLoadingAvailableCabins,
    error: errorAtAvailableCabins,
  } = useQuery({
    queryKey: ["availableCabins", startDate, endDate, maxCapacity],
    queryFn: () => getAvailableCabins(startDate, endDate, maxCapacity),
    enabled: !!startDate && !!endDate && !!maxCapacity, // Ensures query runs only when dates are provided
    onSuccess: () => toast.success("Data of available cabins is ready"),
    onError: (err) => toast.error(err.message),
  });

  return { availableCabins, isLoadingAvailableCabins, errorAtAvailableCabins };
}
