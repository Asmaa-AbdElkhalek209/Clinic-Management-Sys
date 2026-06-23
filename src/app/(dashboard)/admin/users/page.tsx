import UsersTable from "@/features/admin/users/components/UsersTable";
import CreateUserModal from "@/features/admin/users/components/CreateUserModal";
import UserFilters from "@/features/admin/users/components/UserFilters";
import Pagination from "@/features/admin/users/components/Pagination";
import UsersStatsCards from "@/features/admin/users/components/UsersStatsCards";
import {
  getUsers,
  getUsersStats,
} from "@/features/admin/users/actions/get-users.action";

export default async function UsersPage({
  searchParams,
}: {
  // return Promise
  searchParams: Promise<{
    page?: string;
    name?: string;
    role?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams; // await

  const currentPage = Number(params.page) || 1;
  const searchQuery = params.name || "";
  const roleFilter = params.role || "";
  const statusFilter = params.status || "";

  const [data, stats] = await Promise.all([
    getUsers(currentPage, searchQuery, roleFilter, statusFilter),
    getUsersStats(),
  ]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
        <p className="text-sm text-gray-500">
          Manage doctors, receptionists, and their permissions.
        </p>
      </div>

      <UsersStatsCards
        total={stats.total}
        doctors={stats.doctors}
        receptionists={stats.receptionists}
      />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <CreateUserModal />

        <UserFilters
          initialSearch={searchQuery}
          initialRole={roleFilter}
          initialStatus={statusFilter}
        />
      </div>

      <UsersTable users={data.users} />

      <Pagination currentPage={data.page} totalPages={data.totalPages} />
    </div>
  );
}
