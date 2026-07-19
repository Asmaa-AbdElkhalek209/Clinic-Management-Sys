import Header from "@/shared/components/dashboard/Header";
import AppointmentReportSection from "@/features/dashboard/reports/components/AppointmentReportSection";
import { getUsers } from "@/features/dashboard/users/actions/get-users.action";
import PatientReportSection from "@/features/dashboard/reports/components/PatientReportSection";

export default async function ReportsPage() {
  const doctorsData = await getUsers(1, "", "doctor", "active", 1000);
  const doctors = doctorsData.users.map((d) => ({ id: d.id, name: d.name }));

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-6">
      <Header
        title="Reports & Analytics"
        description="Monitor patient registrations and appointment statistics."
      />

      {/* Patient Report Section */}
      <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Patient Statistics
        </h2>
        <PatientReportSection />
      </div>

      {/* Appointment Report Section */}
      <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Appointment Statistics
        </h2>
        <AppointmentReportSection doctors={doctors} />
      </div>
    </div>
  );
}
