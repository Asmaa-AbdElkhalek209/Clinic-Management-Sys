import { Users, UserPlus, UserCircle, User } from "lucide-react";
import { PatientReport } from "../types/report.types";

export const patientReportStats = [
  {
    title: "Total Patients",
    icon: Users,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    getValue: (data?: PatientReport) => data?.totalPatients ?? 0,
  },
  {
    title: "New Registrations",
    icon: UserPlus,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    getValue: (data?: PatientReport) => data?.newRegistrations ?? 0,
  },
  {
    title: "Male",
    icon: UserCircle,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    getValue: (data?: PatientReport) => data?.genderBreakdown?.male ?? 0,
  },
  {
    title: "Female",
    icon: User,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-50",
    getValue: (data?: PatientReport) => data?.genderBreakdown?.female ?? 0,
  },
  {
    title: "Other",
    icon: Users,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    getValue: (data?: PatientReport) => data?.genderBreakdown?.other ?? 0,
  },
];
