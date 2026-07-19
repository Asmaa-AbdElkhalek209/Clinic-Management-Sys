"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ArrowUp, ArrowDown } from "lucide-react";
interface PatientFiltersProps {
  initialSearch: string;
  initialGender: string;
  initialSortBy: string;
  initialOrder: string;
}

export default function PatientFilters({
  initialSearch,
  initialGender,
  initialSortBy,
  initialOrder,
}: PatientFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const updateURL = (
    newSearch: string,
    newGender: string,
    newSortBy: string,
    newOrder: string
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSearch.trim()) params.set("search", newSearch.trim());
    else params.delete("search");

    if (newGender) params.set("gender", newGender);
    else params.delete("gender");

    if (newSortBy) params.set("sortBy", newSortBy);
    else params.delete("sortBy");

    if (newOrder) params.set("order", newOrder);
    else params.delete("order");

    params.set("page", "1");
    router.replace(`/admin/patients?${params.toString()}`);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== initialSearch) {
        updateURL(searchTerm, initialGender, initialSortBy, initialOrder);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-end w-full lg:w-[70%]">
      {/*  1-search */}
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <select
        value={initialGender}
        onChange={(e) =>
          updateURL(searchTerm, e.target.value, initialSortBy, initialOrder)
        }
        className="w-full sm:w-auto rounded-md border border-gray-300 py-2 pl-3 pr-8 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
      >
        <option value="">All Genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <select
        value={initialSortBy}
        onChange={(e) =>
          updateURL(searchTerm, initialGender, e.target.value, initialOrder)
        }
        className="w-full sm:w-auto rounded-md border border-gray-300 py-2 pl-3 pr-8 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
      >
        <option value="createdAt">Sort by Date</option>
        {/* <option value="name">Sort by Name</option> */}
        <option value="age">Sort by Age</option>
      </select>

      <button
        onClick={() =>
          updateURL(
            "",
            "",
            "createdAt",
            initialOrder === "asc" ? "desc" : "asc"
          )
        }
        className="flex items-center gap-2 rounded-md border border-gray-300 py-2 px-3 bg-white hover:bg-gray-50 text-sm text-gray-700 cursor-pointer"
      >
        {initialOrder === "asc" ? (
          <>
            <ArrowUp size={16} />
            <span>Asc</span>
          </>
        ) : (
          <>
            <ArrowDown size={16} />
            <span>Desc</span>
          </>
        )}
      </button>
    </div>
  );
}
