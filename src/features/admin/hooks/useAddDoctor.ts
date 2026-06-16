import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addDoctorApi } from "../api/doctors.api";
import { DoctorFormData } from "../schemas/doctor.schema";

export const useAddDoctor = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addDoctorApi,

    onSuccess: () => {
      toast.success("Doctor added successfully 👨‍⚕️");

      // refresh doctors list
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add doctor");
    },
  });

  const addDoctor = (data: DoctorFormData) => {
    mutation.mutate({
      name: data.name,
      speciality: data.speciality,
      experienceYears: Number(data.experienceYears),
      fees: Number(data.fees),
      about: data.about,
      file: data.file[0], // important
    });
  };

  return {
    addDoctor,
    isLoading: mutation.isPending,
    isError: mutation.isError,
  };
};
