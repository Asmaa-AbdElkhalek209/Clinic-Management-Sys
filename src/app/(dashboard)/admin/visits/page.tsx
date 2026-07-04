import Header from "@/shared/components/dashboard/Header";
import Pagination from "@/shared/components/dashboard/Pagination";

import VisitFilters from "@/features/admin/visits/components/VisitFilters";
import VisitFormModal from "@/features/admin/visits/components/VisitFormModal";
import VisitsTable from "@/features/admin/visits/components/VisitsTable";

import { getVisits } from "@/features/admin/visits/actions/get-visits.action";
import { getPatients } from "@/features/admin/patients/actions/get-patients.action";
import { getUsers } from "@/features/admin/users/actions/get-users.action";

interface VisitsPageProps {
  searchParams: Promise<{
    page?: string;
    patientId?: string;
    doctorId?: string;
  }>;
}

export default async function VisitsPage({
  searchParams,
}: VisitsPageProps) {
  const params = await searchParams;

  const currentPage = Number(params.page ?? "1");

  const filters = {
    patientId: params.patientId ?? "",
    doctorId: params.doctorId ?? "",
  };

  const [visitsData, doctorsData, patientsData] = await Promise.all([
    getVisits(currentPage, filters.patientId, filters.doctorId),
    getUsers(1, "", "doctor", "active", 1000),
    getPatients(1, "", "", "createdAt", "desc", 1000),
  ]);

  const doctors = doctorsData.users.map((doctor) => ({
    id: doctor.id,
    name: doctor.name,
  }));

  const patients = patientsData.patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
  }));

  const appointments = visitsData.visits.map((visit) => ({
    id: visit.appointmentId,
    name: `${visit.patient.name} - ${new Date(visit.createdAt).toLocaleDateString()}`,
  }));

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-6">
      <Header
        title="Visits"
        description="Manage patient visits, diagnoses, and prescriptions."
      />

      <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <VisitFormModal patients={patients} appointments={appointments} />

        <VisitFilters
          initialPatientId={filters.patientId}
          initialDoctorId={filters.doctorId}
          patients={patients}
          doctors={doctors}
        />
      </div>

      <VisitsTable
        visits={visitsData.visits}
        patients={patients}
        appointments={appointments}
      />

      <Pagination
        currentPage={visitsData.page}
        totalPages={visitsData.totalPages}
      />
    </div>
  );
}

