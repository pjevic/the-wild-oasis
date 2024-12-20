/** @format */

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createBooking as createBookingAPI } from "../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isCreatingBooking, mutateAsync: createBooking } = useMutation({
    mutationFn: createBookingAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("New booking successfully created.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { createBooking, isCreatingBooking };
}
