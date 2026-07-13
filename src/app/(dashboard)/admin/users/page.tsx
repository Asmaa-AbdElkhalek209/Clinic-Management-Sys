import { getSpecialities } from "@/features/admin/users/actions/get-specialities.action";
import {
  getUsers,
  getUsersStats,
} from "@/features/admin/users/actions/get-users.action";
import UserFilters from "@/features/admin/users/components/UserFilters";
import UserFormModal from "@/features/admin/users/components/UserFormModal";
import UsersStatsCards from "@/features/admin/users/components/UsersStatsCards";
import UsersTable from "@/features/admin/users/components/UsersTable";
import Header from "@/shared/components/dashboard/Header";
import Pagination from "@/shared/components/dashboard/Pagination";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    name?: string;
    role?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const searchQuery = params.name || "";
  const roleFilter = params.role || "";
  const statusFilter = params.status || "";

  const [data, stats, specialities] = await Promise.all([
    getUsers(currentPage, searchQuery, roleFilter, statusFilter),
    getUsersStats(),
    getSpecialities(),
  ]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <Header
          title="Users Management"
          description="Manage doctors, receptionists, and their permissions."
        />
      </div>

      <UsersStatsCards
        total={stats.total}
        doctors={stats.doctors}
        receptionists={stats.receptionists}
      />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <UserFormModal specialities={specialities} />

        <UserFilters
          initialSearch={searchQuery}
          initialRole={roleFilter}
          initialStatus={statusFilter}
        />
      </div>

      <UsersTable users={data.users} specialities={specialities} />

      <Pagination currentPage={data.page} totalPages={data.totalPages} />
    </div>
  );
}
