import { useQuery } from "@tanstack/react-query";
import { getPatientReport } from "../actions/get-patient-report.action";

export function usePatientReport(startDate: string, endDate: string) {
  return useQuery({
    queryKey: ["patient-report", startDate, endDate],
    queryFn: () => getPatientReport(startDate, endDate),
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 60,
  });
}
