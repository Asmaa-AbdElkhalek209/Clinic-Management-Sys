// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Briefcase, Shield, Mail, Camera } from "lucide-react";
// import { useProfile } from "../hooks/use-profile";
// import { useUpdateProfile } from "../hooks/use-update-profile";
// import { updateProfileSchema } from "../schemas/profile.schema";
// import { UpdateProfilePayload, Speciality } from "../types/profile.types";
// import { useEffect } from "react";
// const inputClasses =
//   "w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition-colors";

// const selectClasses =
//   "w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"; // ✅ كلاس للـ Select

// const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5";

// interface ProfileFormProps {
//   specialities: Speciality[];
// }

// export default function ProfileForm({ specialities }: ProfileFormProps) {
//   const { data: profile, isLoading } = useProfile();
//   const { mutate: updateProfile, isPending } = useUpdateProfile();

//   const form = useForm<UpdateProfilePayload>({
//     resolver: zodResolver(updateProfileSchema),
//     defaultValues: {
//       name: "",
//       phone: "",
//       speciality: "",
//       experienceYears: null,
//       fees: null,
//       about: "",
//     },
//   });

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = form;

//   useEffect(() => {
//   if (!profile) return;

//   reset({
//     name: profile.name,
//     phone: profile.phone,
//     speciality: profile.speciality ?? "",
//     experienceYears: profile.experienceYears,
//     fees: Number(profile.fees) || null,
//     about: profile.about ?? "",
//   });
// }, [profile, reset]);
//   function onSubmit(values: UpdateProfilePayload) {
//     if (!profile) return;
//     updateProfile({ values, userType: profile.userType });
//   }

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center space-y-6 py-10 animate-pulse">
//         <div className="h-28 w-28 rounded-full bg-gray-200" />
//         <div className="h-6 bg-gray-200 rounded w-48" />
//         <div className="w-full h-40 bg-gray-200 rounded" />
//       </div>
//     );
//   }

//   if (!profile)
//     return (
//       <p className="text-sm text-red-500 text-center py-10">
//         Failed to load profile data.
//       </p>
//     );

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//       {/* Profile Header & Avatar */}
//       <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
//         <div className="relative group mb-4">
//           <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-100 text-4xl font-bold text-blue-600 shadow-sm">
//             {profile.name.slice(0, 2).toUpperCase()}
//           </div>
//           <button
//             type="button"
//             className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 shadow-sm transition-colors hover:bg-gray-50 hover:text-blue-600"
//           >
//             <Camera className="h-4 w-4" />
//           </button>
//         </div>

//         <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
//         <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
//           <Mail className="w-4 h-4" />
//           {profile.email}
//         </p>

//         <div className="flex items-center gap-2 mt-3">
//           <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
//             <Shield className="w-3 h-3" />
//             {profile.userType.charAt(0).toUpperCase() +
//               profile.userType.slice(1)}
//           </span>
//           <span
//             className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
//               profile.status === "active"
//                 ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
//                 : "bg-red-50 text-red-700 ring-red-600/20"
//             }`}
//           >
//             {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
//           </span>
//         </div>
//       </div>

//       {/* Contact Details Section */}
//       <div>
//         <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
//           Contact Details
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
//           <div>
//             <label className={labelClasses}>Full Name</label>
//             <input type="text" {...register("name")} className={inputClasses} />
//             {errors.name && (
//               <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
//             )}
//           </div>

//           <div>
//             <label className={labelClasses}>Email Address</label>
//             <input
//               type="email"
//               value={profile.email}
//               disabled
//               className={`${inputClasses} bg-gray-50 text-gray-500 cursor-not-allowed`}
//             />
//             <p className="mt-1.5 text-xs text-gray-400">
//               Email cannot be changed here.
//             </p>
//           </div>

//           <div className="md:col-span-2">
//             <label className={labelClasses}>Phone Number</label>
//             <input
//               type="text"
//               {...register("phone")}
//               className={inputClasses}
//             />
//             {errors.phone && (
//               <p className="mt-1 text-xs text-red-500">
//                 {errors.phone.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Professional Details Section (للدكاترة فقط) */}
//       {profile.userType === "doctor" && (
//         <div>
//           <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
//             <Briefcase className="w-4 h-4 text-gray-600" />
//             <h3 className="text-sm font-semibold text-gray-900">
//               Professional Details
//             </h3>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
//             {/* ✅ 2. استبدال الـ Input بـ Select للتخصصات */}
//             <div>
//               <label className={labelClasses}>Speciality</label>
//               <select {...register("speciality")} className={selectClasses}>
//                 <option value="">Select Speciality...</option>
//                 {specialities.map((spec) => (
//                   <option key={spec.key} value={spec.label}>
//                     {spec.label}
//                   </option>
//                 ))}
//               </select>
//               {errors.speciality && (
//                 <p className="mt-1 text-xs text-red-500">
//                   {errors.speciality.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className={labelClasses}>Experience Years</label>
//               <input
//                 type="number"
//                 {...register("experienceYears")}
//                 className={inputClasses}
//                 placeholder="e.g. 5"
//               />
//               {errors.experienceYears && (
//                 <p className="mt-1 text-xs text-red-500">
//                   {errors.experienceYears.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className={labelClasses}>Consultation Fees (EGP)</label>
//               <input
//                 type="number"
//                 {...register("fees")}
//                 className={inputClasses}
//                 placeholder="e.g. 200"
//               />
//               {errors.fees && (
//                 <p className="mt-1 text-xs text-red-500">
//                   {errors.fees.message}
//                 </p>
//               )}
//             </div>

//             <div className="md:col-span-2">
//               <label className={labelClasses}>About / Bio</label>
//               <textarea
//                 rows={4}
//                 {...register("about")}
//                 className={inputClasses}
//                 placeholder="Write a short bio..."
//               />
//               {errors.about && (
//                 <p className="mt-1 text-xs text-red-500">
//                   {errors.about.message}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Save Button */}
//       <div className="flex justify-end pt-4 border-t border-gray-100">
//         <button
//           type="submit"
//           disabled={isPending}
//           className="rounded-md bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isPending ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </form>
//   );
// }

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
        <div className="h-64 rounded-2xl bg-gray-200" />
        <div className="h-80 rounded-2xl bg-gray-200" />
        <div className="h-80 rounded-2xl bg-gray-200" />
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
