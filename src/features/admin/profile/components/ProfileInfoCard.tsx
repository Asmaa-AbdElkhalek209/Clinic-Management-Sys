"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Speciality, UpdateProfilePayload } from "../types/profile.types";

interface Props {
  register: UseFormRegister<UpdateProfilePayload>;
  errors: FieldErrors<UpdateProfilePayload>;
  specialities: Speciality[];
}

const inputClasses =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100";

export default function ProfessionalInformationCard({
  register,
  errors,
  specialities,
}: Props) {
  return (
    <div className="px-5 py-2">
      <h3 className="mb-6 text-lg font-semibold">Professional Information</h3>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Experience</label>

          <input
            type="number"
            {...register("experienceYears")}
            className={inputClasses}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Consultation Fees
          </label>

          <input type="number" {...register("fees")} className={inputClasses} />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Speciality</label>

          <select {...register("speciality")} className={inputClasses}>
            <option value="">Select Speciality</option>

            {specialities.map((item) => (
              <option key={item.key} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">About</label>

          <textarea rows={6} {...register("about")} className={inputClasses} />

          {errors.about && (
            <p className="mt-1 text-sm text-red-500">{errors.about.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
