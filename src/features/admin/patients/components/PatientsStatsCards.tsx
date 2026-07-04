import { Users, UserCheck, UserX } from "lucide-react";
import StatsCard from "@/shared/components/dashboard/StatsCard";

interface PatientsStatsCardsProps {
  total: number;
  males: number;
  females: number;
}

export default function PatientsStatsCards({
  total,
  males,
  females,
}: PatientsStatsCardsProps) {
  const stats = [
    {
      label: "Total Patients",
      value: total,
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Male Patients",
      value: males,
      icon: UserCheck,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
    },
    {
      label: "Female Patients",
      value: females,
      icon: UserX,
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600",
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
