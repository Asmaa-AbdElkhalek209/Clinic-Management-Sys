import { api } from "@/shared/lib/axios";

export type AddDoctorRequest = {
  name: string;
  speciality: string;
  experienceYears: number;
  fees: number;
  about: string;
  file: File;
};
export type Doctor = {
  id: number;
  name: string;
  speciality: string;
  experienceYears: number;
  fees: number;
  about: string;
  image: string;
};

export type GetDoctorsResponse = {
  success: boolean;
  doctors: Doctor[];
};

export const addDoctorApi = async (data: AddDoctorRequest) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("speciality", data.speciality);
  formData.append("experienceYears", String(data.experienceYears));
  formData.append("fees", String(data.fees));
  formData.append("about", data.about);
  formData.append("file", data.file);

  const res = await api.post("/doctors/add-doctor", formData);

  return res.data;
};

export const getDoctorsApi = async (): Promise<GetDoctorsResponse> => {
  const res = await api.get("/doctors/all-doctors");
  return res.data;
};
