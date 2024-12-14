/** @format */

import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { login as loginAPI } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      // Manuly set data to React Qury cash
      queryClient.setQueriesData(["user"], user);
      navigate("/");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email and password are incorrect");
    },
  });

  return { login, isLoading };
}
