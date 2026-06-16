import DoctorsTable from "@/features/admin/components/(admin)/doctors/DoctorsTable";
import Header from "@/shared/components/dashboard/Header";

export default function DoctorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Header title="Doctors" />

      <DoctorsTable />
    </div>
  );
}
