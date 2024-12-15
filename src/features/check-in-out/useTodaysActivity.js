/** @format */

import { useQuery } from "@tanstack/react-query";
import { getTodaysActivities } from "../../services/apiBookings";

export function useTodaysActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getTodaysActivities,
    queryKey: ["today-activity"],
  });

  return { isLoading, activities };
}
