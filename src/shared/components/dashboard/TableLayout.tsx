"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Column = {
  label: string;
  className?: string;
};

type TableLayoutProps = {
  columns: Column[];
  children: React.ReactNode;
  totalItems: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
};

export default function TableLayout({
  columns,
  children,
  totalItems,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}: TableLayoutProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <section className="flex flex-col gap-5 w-full font-poppins py-5 text-[#444444]">
      {/* TABLE */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-center">
          {/* HEADER */}
          <thead className="bg-[#F9F9F9]">
            <tr className="text-sm font-medium">
              {columns.map((col, index) => (
                <th key={index} className={`px-4 py-4 ${col.className || ""}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>{children}</tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p>
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, totalItems)} of {totalItems}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="border rounded-sm px-2 py-1"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded-sm  ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="border rounded-sm px-2 py-1"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
