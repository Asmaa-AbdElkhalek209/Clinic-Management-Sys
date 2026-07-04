import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  iconBg: string;
  iconColor: string;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  iconBg,
  iconColor,
}: StatsCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-3 ${iconBg} ${iconColor} rounded-lg`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
