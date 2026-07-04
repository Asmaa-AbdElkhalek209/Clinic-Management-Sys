import { Users, Stethoscope, UserCheck } from "lucide-react";
import StatsCard from "@/shared/components/dashboard/StatsCard";

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
  const stats = [
    {
      label: "Total Users",
      value: total,
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Doctors",
      value: doctors,
      icon: Stethoscope,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Receptionists",
      value: receptionists,
      icon: UserCheck,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <StatsCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          iconBg={stat.iconBg}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
}
