import UsersTable from "@/features/admin/components/(admin)/users/UsersTable";
import Header from "@/shared/components/dashboard/Header";

export default function UsersPage() {
  return (
    <div className="w-full flex flex-col gap-9 p-4 sm:p-6 md:p-8 bg-transparent">
      <Header title="Users" />
      <UsersTable />
    </div>
  );
}
