import { useQuery } from "@tanstack/react-query";
import { getServiceHires } from "../api/serviceHires";

export function useServiceHires() {
  return useQuery({
    queryKey: ["serviceHires"],
    queryFn: getServiceHires,
  });
}
