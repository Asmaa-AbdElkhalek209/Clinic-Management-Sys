"use client";

import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

import TableLayout from "@/shared/components/dashboard/TableLayout";
import Filters from "@/shared/components/dashboard/Filters";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import AddEntityButton from "@/shared/components/dashboard/AddEntityButton";
import DeleteModal from "@/shared/components/dashboard/DeleteModal";
import UserFormModal from "./UserFormModal";

type User = {
  id: number;
  name: string;
  role: string;
  email: string;
  status: "Active" | "Inactive";
  checkbox: boolean;
};

export default function UsersTable() {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Ahmed Ali",
      role: "Admin",
      email: "ahmed@gmail.com",
      status: "Active",
      checkbox: true,
    },
    {
      id: 2,
      name: "Sara Mohamed",
      role: "Doctor",
      email: "sara@gmail.com",
      status: "Active",
      checkbox: true,
    },
    {
      id: 3,
      name: "Omar Hassan",
      role: "Receptionist",
      email: "omar@gmail.com",
      status: "Inactive",
      checkbox: false,
    },
  ]);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const toggleStatus = (id: number, checked: boolean) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              checkbox: checked,
              status: checked ? "Active" : "Inactive",
            }
          : u
      )
    );
  };

  const columns = [
    { label: "ID" },
    { label: "Name" },
    { label: "Email" },
    { label: "Role" },
    { label: "Status" },
    { label: "Actions" },
  ];

  return (
    <section className="bg-white flex flex-col gap-4 p-4 md:p-6 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Filters
          search={search}
          setSearch={setSearch}
          searchPlaceholder="Search users..."
        />

        <AddEntityButton label="User" onOpen={() => setOpenFormModal(true)} />
      </div>

      {/* Table */}
      <TableLayout
        columns={columns}
        totalItems={filteredUsers.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      >
        {currentItems.map((user) => (
          <tr key={user.id} className="border-b hover:bg-gray-50">
            <td className="py-3">{user.id}</td>
            <td className="py-3">{user.name}</td>
            <td className="py-3">{user.email}</td>
            <td className="py-3">{user.role}</td>

            {/* Status */}
            <td className="py-3">
              <div className="flex items-center justify-center gap-2">
                <Switch
                  checked={user.checkbox}
                  onCheckedChange={(val) => toggleStatus(user.id, val)}
                />
                <Label
                  className={
                    user.status === "Active" ? "text-green-500" : "text-red-500"
                  }
                >
                  {user.status}
                </Label>
              </div>
            </td>

            {/* Actions */}
            <td className="py-3">
              <div className="flex justify-center gap-3">
                <button onClick={() => setOpenModalDelete(true)}>
                  <Trash2 className="w-5 h-5" />
                </button>

                <button>
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </TableLayout>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        itemName="User"
      />

      {/* Form Modal  */}
      <UserFormModal open={openFormModal} setOpen={setOpenFormModal} />
    </section>
  );
}
