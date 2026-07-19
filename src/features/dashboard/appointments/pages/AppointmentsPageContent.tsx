import Header from "@/shared/components/dashboard/Header";
import Pagination from "@/shared/components/dashboard/Pagination";

import AppointmentFilters from "@/features/dashboard/appointments/components/AppointmentFilters";
import AppointmentsTable from "@/features/dashboard/appointments/components/AppointmentsTable";

import { getAppointments } from "@/features/dashboard/appointments/actions/get-appointments.action";
import { getPatients } from "@/features/dashboard/patients/actions/get-patients.action";
import { getUsers } from "@/features/dashboard/users/actions/get-users.action";
import CreateAppointmentForm from "@/features/dashboard/appointments/components/CreateAppointmentForm";

export interface AppointmentsPageProps {
  searchParams: Promise<{
    page?: string;
    date?: string;
    status?: string;
    doctorId?: string;
    patientId?: string;
  }>;
}

export default async function AppointmentsPageContent({
  searchParams,
}: AppointmentsPageProps) {
  const params = await searchParams;

  const currentPage = Number(params.page ?? "1");

  const filters = {
    date: params.date ?? "",
    status: params.status ?? "",
    doctorId: params.doctorId ?? "",
    patientId: params.patientId ?? "",
  };

  const [appointmentsData, doctorsData, patientsData] = await Promise.all([
    getAppointments(
      currentPage,
      filters.date,
      filters.status,
      filters.doctorId,
      filters.patientId
    ),
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

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-6">
      <Header
        title="Appointments"
        description="Schedule, manage, and track patient appointments."
      />

      <div className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <CreateAppointmentForm doctors={doctors} patients={patients} />

        <AppointmentFilters
          initialDate={filters.date}
          initialStatus={filters.status}
          initialDoctorId={filters.doctorId}
          initialPatientId={filters.patientId}
          doctors={doctors}
          patients={patients}
        />
      </div>

      <AppointmentsTable
        appointments={appointmentsData.appointments}
        doctors={doctors}
        patients={patients}
      />

      <Pagination
        currentPage={appointmentsData.page}
        totalPages={appointmentsData.totalPages}
      />
    </div>
  );
}
