"use client";

import { useState } from "react";
import Image from "next/image";

import TableLayout from "@/shared/components/dashboard/TableLayout";
import Filters from "@/shared/components/dashboard/Filters";
import AddEntityButton from "@/shared/components/dashboard/AddEntityButton";

import DeleteModal from "@/shared/components/dashboard/DeleteModal";
import DoctorFormModal from "./DoctorForm";

import { useGetDoctors } from "@/features/admin/hooks/useGetDoctors";

export default function DoctorsTable() {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const { doctors = [], isLoading } = useGetDoctors();

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);

  const columns = [
    { label: "Image" },
    { label: "Name" },
    { label: "Speciality" },
    { label: "Experience" },
    { label: "Fees" },
    { label: "About" },
  ];

  return (
    <section className="bg-white flex flex-col gap-4 p-4 md:p-6 rounded-xl">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Filters
          search={search}
          setSearch={setSearch}
          searchPlaceholder="Search doctors..."
        />

        <AddEntityButton label="Doctor" onOpen={() => setOpenFormModal(true)} />
      </div>

      {/* Loading */}
      {isLoading && <p className="p-4 text-gray-500">Loading doctors...</p>}

      {/* Table */}
      {!isLoading && (
        <TableLayout
          columns={columns}
          totalItems={filteredDoctors.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        >
          {currentItems.map((doctor) => (
            <tr
              key={doctor.id}
              className="border-b hover:bg-gray-50 transition"
            >
              {/* Image */}
              <td className="py-3">
                <Image
                  src={doctor.image || "/placeholder.png"}
                  alt={doctor.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover mx-auto"
                />
              </td>

              {/* Name */}
              <td className="py-3">{doctor.name}</td>

              {/* Speciality */}
              <td className="py-3">{doctor.speciality}</td>

              {/* Experience */}
              <td className="py-3">{doctor.experienceYears} yrs</td>

              {/* Fees */}
              <td className="py-3">${doctor.fees}</td>

              {/* About */}
              <td className="py-3 max-w-[180px] truncate">{doctor.about}</td>
            </tr>
          ))}
        </TableLayout>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        itemName="Doctor"
      />

      {/* Form Modal */}
      <DoctorFormModal open={openFormModal} setOpen={setOpenFormModal} />
    </section>
  );
}
