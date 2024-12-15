/** @format */

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdatingUser, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("User successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdatingUser };
}
