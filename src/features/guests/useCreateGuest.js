/** @format */

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createGuest as createGuestAPI } from "../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { isLoading: isCreatingGuest, mutateAsync: createGuest } = useMutation({
    mutationFn: createGuestAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
      toast.success("New guest successfully created.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { createGuest, isCreatingGuest };
}
