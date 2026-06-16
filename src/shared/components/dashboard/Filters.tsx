"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";

type FiltersProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchPlaceholder?: string;
};

export default function Filters({
  search,
  setSearch,
  searchPlaceholder = "Search...",
}: FiltersProps) {
  return (
    <div className="group relative w-full md:w-100 ">
      <Input
        type="text"
        placeholder={searchPlaceholder}
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        className="
            h-11
            rounded-sm
            border-2 border-[#D0D0D0]
            bg-transparent
            pl-10
            text-[16px]
            text-[#444444]
            placeholder:text-[#777]
            focus:outline-none
            focus-visible:ring-0
            focus-visible:border-blue-400
            focus:placeholder:text-blue-400
          "
      />

      <Search
        size={18}
        className="
            absolute left-3 top-1/2 -translate-y-1/2
            text-[#777]
            transition-colors
            group-focus-within:text-blue-400
          "
      />
    </div>
  );
}
