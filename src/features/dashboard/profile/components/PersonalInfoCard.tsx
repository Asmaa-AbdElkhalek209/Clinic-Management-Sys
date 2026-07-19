"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UpdateProfilePayload, UserProfile } from "../types/profile.types";

interface Props {
  register: UseFormRegister<UpdateProfilePayload>;
  errors: FieldErrors<UpdateProfilePayload>;
  profile: UserProfile;
}

const inputClasses =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100";

export default function PersonalInformationCard({
  register,
  errors,
  profile,
}: Props) {
  return (
    <div className="px-5 py-2">
      <h3 className="mb-6 text-lg font-semibold text-slate-900">
        Personal Information
      </h3>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Full Name</label>

          <input {...register("name")} className={inputClasses} />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Phone Number</label>

          <input {...register("phone")} className={inputClasses} />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
