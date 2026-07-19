import {
  getPatients,
  getPatientsStats,
} from "@/features/dashboard/patients/actions/get-patients.action";
import PatientFormModal from "@/features/dashboard/patients/components/PatientFormModal";
import PatientFilters from "@/features/dashboard/patients/components/PatientFilters";
import PatientsTable from "@/features/dashboard/patients/components/PatientsTable";
import PatientsStatsCards from "@/features/dashboard/patients/components/PatientsStatsCards";
import Header from "@/shared/components/dashboard/Header";
import Pagination from "@/shared/components/dashboard/Pagination";
import { permissions } from "@/shared/config/permissions";
import { hasPermission } from "@/shared/lib/has-permission";
import { authOptions } from "@/shared/lib/auth-options";
import { getServerSession } from "next-auth";

export interface PatientsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    gender?: string;
    sortBy?: string;
    order?: string;
  }>;
}
export default async function PatientsPageContent({
  searchParams,
}: PatientsPageProps) {
  const params = await searchParams;

  const session = await getServerSession(authOptions);
  const canCreate = hasPermission(
    session?.user.role,
    permissions.patients.create
  );
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.search || "";
  const genderFilter = params.gender || "";
  const sortBy = params.sortBy || "createdAt";
  const order = params.order || "desc";

  const [data, stats] = await Promise.all([
    getPatients(currentPage, searchQuery, genderFilter, sortBy, order),
    getPatientsStats(),
  ]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <Header
          title="Patients Management"
          description="Manage patient records and their information."
        />
      </div>

      <PatientsStatsCards
        total={stats.total}
        males={stats.males}
        females={stats.females}
      />

      <div
        className={`flex flex-col lg:flex-row lg:items-center ${
          canCreate ? "lg:justify-between" : "lg:justify-end"
        } gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm`}
      >
        {canCreate && <PatientFormModal />}
        <PatientFilters
          initialSearch={searchQuery}
          initialGender={genderFilter}
          initialSortBy={sortBy}
          initialOrder={order}
        />
      </div>

      <PatientsTable patients={data.patients} />

      <Pagination currentPage={data.page} totalPages={data.totalPages} />
    </div>
  );
}
