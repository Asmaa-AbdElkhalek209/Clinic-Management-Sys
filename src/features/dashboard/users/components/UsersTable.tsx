"use client";

import UpdateUserForm from "./UpdateUserForm";
import DeleteUserButton from "./DeleteUserButton";
import { User, Speciality } from "../types/user.types";
import ToggleStatusButton from "./ToggleStatusButton";
import DataTable from "@/shared/components/dashboard/DataTable";

interface UsersTableProps {
  users: User[];
  specialities: Speciality[];
}

const getInitials = (name: string) => {
  const names = name.split(" ");
  return names.length > 1
    ? `${names[0][0]}${names[1][0]}`.toUpperCase()
    : name.substring(0, 2).toUpperCase();
};

export default function UsersTable({ users, specialities }: UsersTableProps) {
  const columns = [
    { label: "User" },
    { label: "Role" },
    { label: "Speciality" },
    { label: "Contact" },
    { label: "Status" },
    { label: "Actions", className: "text-center" },
  ];

  return (
    <DataTable columns={columns} emptyMessage="No users found.">
      {users.map((user) => (
        <tr
          key={user.id}
          className="hover:bg-gray-50/50 transition-colors duration-150"
        >
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm">
                {getInitials(user.name)}
              </div>
              <div>
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-400">ID: #{user.id}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                user.userType === "admin"
                  ? "bg-purple-50 text-purple-700 ring-purple-600/20"
                  : user.userType === "doctor"
                    ? "bg-blue-50 text-blue-700 ring-blue-600/20"
                    : "bg-green-50 text-green-700 ring-green-600/20"
              }`}
            >
              {user.userType}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
            {user.speciality ? (
              user.speciality
            ) : (
              <span className="text-gray-300">—</span>
            )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-gray-700">{user.email}</div>
            <div className="text-xs text-gray-400">{user.phone}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center gap-3">
              <ToggleStatusButton userId={user.id} status={user.status} />
              <span
                className={`text-xs font-semibold ${user.status === "active" ? "text-emerald-600" : "text-red-600"}`}
              >
                {user.status}
              </span>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center justify-center gap-2">
              <UpdateUserForm user={user} specialities={specialities} />{" "}
              <DeleteUserButton userId={user.id} userName={user.name} />
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
