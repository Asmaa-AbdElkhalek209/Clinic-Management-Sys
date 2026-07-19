"use client";

import { Mail, ShieldCheck } from "lucide-react";
import { UserProfile } from "../types/profile.types";

interface ProfileHeroProps {
  profile: UserProfile;
}

const getInitials = (name: string) => {
  const names = name.trim().split(" ");

  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
};

export default function ProfileHero({ profile }: ProfileHeroProps) {
  return (
    <div className="px-5 py-2">
      <div className="flex flex-col items-center px-8 py-6 text-center gap-2">
        {/* Avatar */}
        <div className="flex p-5 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
          {getInitials(profile.name)}
        </div>

        {/* Name */}
        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          {profile.name}
        </h2>

        {/* Email */}
        <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
          <Mail size={16} />
          <span>{profile.email}</span>
        </div>

        {/* Badges */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <ShieldCheck size={14} />
            {profile.userType.charAt(0).toUpperCase() +
              profile.userType.slice(1)}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              profile.status === "active"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
