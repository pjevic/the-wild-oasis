/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("Booking Succsessfully deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteBooking, isDeletingBooking };
}
