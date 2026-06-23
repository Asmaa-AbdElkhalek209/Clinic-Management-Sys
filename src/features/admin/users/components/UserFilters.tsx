"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

interface UserFiltersProps {
  initialSearch: string;
  initialRole: string;
  initialStatus: string;
}

export default function UserFilters({
  initialSearch,
  initialRole,
  initialStatus,
}: UserFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); //url prameters

  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const updateURL = (newSearch: string, newRole: string, newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // 1. Search
    if (newSearch) params.set("name", newSearch);
    else params.delete("name");

    // 2. Role
    if (newRole && newRole !== "all") params.set("role", newRole);
    else params.delete("role");

    // 3. Status
    if (newStatus && newStatus !== "all") params.set("status", newStatus);
    else params.delete("status");

    params.set("page", "1");

    router.push(`/admin/users?${params.toString()}`);
  };

  //search only
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== initialSearch) {
        updateURL(searchTerm, initialRole, initialStatus);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      {/*  1-search */}
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* filter  */}
      <select
        value={initialRole}
        onChange={(e) => updateURL(searchTerm, e.target.value, initialStatus)}
        className="w-full sm:w-auto rounded-md border border-gray-300 py-2 pl-3 pr-8 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
      >
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="doctor">Doctor</option>
        <option value="receptionist">Receptionist</option>
      </select>

      <select
        value={initialStatus}
        onChange={(e) => updateURL(searchTerm, initialRole, e.target.value)}
        className="w-full sm:w-auto rounded-md border border-gray-300 py-2 pl-3 pr-8 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}
