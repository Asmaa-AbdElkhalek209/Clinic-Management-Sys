import Header from "@/shared/components/dashboard/Header";
import Pagination from "@/shared/components/dashboard/Pagination";

import AppointmentFilters from "@/features/dashboard/appointments/components/AppointmentFilters";
import AppointmentsTable from "@/features/dashboard/appointments/components/AppointmentsTable";
import CreateAppointmentForm from "@/features/dashboard/appointments/components/CreateAppointmentForm";

import { getAppointments } from "@/features/dashboard/appointments/actions/get-appointments.action";
import { getPatients } from "@/features/dashboard/patients/actions/get-patients.action";
import { getUsers } from "@/features/dashboard/users/actions/get-users.action";

import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth-options";
import { hasPermission } from "@/shared/lib/has-permission";
import { permissions } from "@/shared/config/permissions";

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

  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  const canCreate = hasPermission(role, permissions.appointments.create);

  const currentPage = Number(params.page ?? "1");

  const filters = {
    date: params.date ?? "",
    status: params.status ?? "",
    doctorId: params.doctorId ?? "",
    patientId: params.patientId ?? "",
  };

  const appointmentsData = await getAppointments(
    currentPage,
    filters.date,
    filters.status,
    filters.doctorId,
    filters.patientId
  );

  let doctors: { id: number; name: string }[] = [];
  let patients: { id: number; name: string }[] = [];

  if (role !== "doctor") {
    const [doctorsData, patientsData] = await Promise.all([
      getUsers(1, "", "doctor", "active", 1000),
      getPatients(1, "", "", "createdAt", "desc", 1000),
    ]);

    doctors = doctorsData.users.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
    }));

    patients = patientsData.patients.map((patient) => ({
      id: patient.id,
      name: patient.name,
    }));
  }

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-6">
      <Header
        title="Appointments"
        description="Schedule, manage, and track patient appointments."
      />

      <div
        className={`flex flex-col lg:flex-row lg:items-center ${
          canCreate ? "lg:justify-between" : "lg:justify-end"
        } gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm`}
      >
        {canCreate && (
          <CreateAppointmentForm doctors={doctors} patients={patients} />
        )}

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

// const [appointmentsData, doctorsData, patientsData] = await Promise.all([
//   getAppointments(
//     currentPage,
//     filters.date,
//     filters.status,
//     filters.doctorId,
//     filters.patientId
//   ),
//   getUsers(1, "", "doctor", "active", 1000),
//   getPatients(1, "", "", "createdAt", "desc", 1000),
// ]);
