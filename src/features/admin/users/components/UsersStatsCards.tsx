import { Users, Stethoscope, UserCheck } from "lucide-react";

interface UsersStatsCardsProps {
  total: number;
  doctors: number;
  receptionists: number;
}

export default function UsersStatsCards({
  total,
  doctors,
  receptionists,
}: UsersStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/*   all total */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-gray-800">{total}</p>
        </div>
      </div>

      {/*  doctors total */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
          <Stethoscope className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Doctors</p>
          <p className="text-2xl font-bold text-gray-800">{doctors}</p>
        </div>
      </div>

      {/* Receptionists total  */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
          <UserCheck className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Receptionists</p>
          <p className="text-2xl font-bold text-gray-800">{receptionists}</p>
        </div>
      </div>
    </div>
  );
}
