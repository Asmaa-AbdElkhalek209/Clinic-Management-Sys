import {
  getPatients,
  getPatientsStats,
} from "@/features/admin/patients/actions/get-patients.action";
import PatientFormModal from "@/features/admin/patients/components/PatientFormModal";
import PatientFilters from "@/features/admin/patients/components/PatientFilters";
import PatientsTable from "@/features/admin/patients/components/PatientsTable";
import PatientsStatsCards from "@/features/admin/patients/components/PatientsStatsCards";
import Header from "@/shared/components/dashboard/Header";
import Pagination from "@/shared/components/dashboard/Pagination";

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    gender?: string;
    sortBy?: string;
    order?: string;
  }>;
}) {
  const params = await searchParams;

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

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <PatientFormModal />
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
