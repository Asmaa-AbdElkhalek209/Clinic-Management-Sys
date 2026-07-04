import { useQuery } from "@tanstack/react-query";
import { getAppointmentReport } from "../actions/get-appointment-report.action";

export function useAppointmentReport(
  doctorId: string,
  startDate: string,
  endDate: string
) {
  return useQuery({
    queryKey: ["appointment-report", doctorId, startDate, endDate],
    queryFn: () => getAppointmentReport(doctorId, startDate, endDate),
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 60,
  });
}
