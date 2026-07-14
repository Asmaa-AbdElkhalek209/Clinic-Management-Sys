"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useProfile } from "../hooks/use-profile";
import { useUpdateProfile } from "../hooks/use-update-profile";

import { updateProfileSchema } from "../schemas/profile.schema";
import { UpdateProfilePayload, Speciality } from "../types/profile.types";

import ProfileHero from "./ProfileHero";
import PersonalInformationCard from "./PersonalInfoCard";
// import ProfessionalInformationCard from "./ProfileInfoCard";
import SaveProfileButton from "./SaveProfileButton";
import ProfessionalInformationCard from "./ProfileInfoCard";

interface ProfileFormProps {
  specialities: Speciality[];
}

export default function ProfileForm({ specialities }: ProfileFormProps) {
  const { data: profile, isLoading } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const form = useForm<UpdateProfilePayload>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      phone: "",
      speciality: "",
      experienceYears: null,
      fees: null,
      about: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!profile) return;

    reset({
      name: profile.name,
      phone: profile.phone,
      speciality: profile.speciality ?? "",
      experienceYears: profile.experienceYears,
      fees: profile.fees ? Number(profile.fees) : null,
      about: profile.about ?? "",
    });
  }, [profile, reset]);

  function onSubmit(values: UpdateProfilePayload) {
    if (!profile) return;

    updateProfile({
      values,
      userType: profile.userType,
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-64 rounded-2xl bg-white" />
        <div className="h-80 rounded-2xl bg-white" />
        <div className="h-80 rounded-2xl bg-white" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
        Failed to load profile.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-6xl space-y-6"
    >
      <ProfileHero profile={profile} />

      <PersonalInformationCard
        register={register}
        errors={errors}
        profile={profile}
      />

      {profile.userType === "doctor" && (
        <ProfessionalInformationCard
          register={register}
          errors={errors}
          specialities={specialities}
        />
      )}

      <SaveProfileButton isPending={isPending} />
    </form>
  );
}
