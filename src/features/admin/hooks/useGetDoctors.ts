import { useQuery } from "@tanstack/react-query";
import { getDoctorsApi } from "../api/doctors.api";

export const useGetDoctors = () => {
  const query = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctorsApi,
  });

  return {
    doctors: query.data?.doctors || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
