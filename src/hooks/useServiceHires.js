import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getServiceHires,
  updateServiceHireStatus,
  deleteServiceHire,
  sendServiceQuote,
} from "../api/serviceHires";

export function useServiceHires() {
  return useQuery({
    queryKey: ["serviceHires"],
    queryFn: getServiceHires,
  });
}

export function useUpdateServiceHireStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateServiceHireStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceHires"] });
    },
  });
}

export function useDeleteServiceHire() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteServiceHire,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceHires"] });
    },
  });
}

export function useSendServiceQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendServiceQuote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceHires"] });
    },
  });
}
