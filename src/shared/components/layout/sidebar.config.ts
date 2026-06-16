import {
  LayoutDashboard,
  Users,
  CalendarDays,
  ClipboardList,
  Stethoscope,
  Settings,
  FileBarChart,
} from "lucide-react";

export type UserRole = "admin" | "doctor" | "receptionist";

export const sidebarConfig = {
  admin: [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      label: "Patients",
      href: "/admin/patients",
      icon: Users,
    },
    {
      label: "Appointments",
      href: "/admin/appointments",
      icon: CalendarDays,
    },
    {
      label: "Visits",
      href: "/admin/visits",
      icon: ClipboardList,
    },
    {
      label: "Doctors",
      href: "/admin/doctors",
      icon: Stethoscope,
    },
    {
      label: "Reports",
      href: "/admin/reports",
      icon: FileBarChart,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ],

  doctor: [
    {
      label: "Dashboard",
      href: "/doctor",
      icon: LayoutDashboard,
    },
    {
      label: "Patients",
      href: "/doctor/patients",
      icon: Users,
    },
    {
      label: "Visits",
      href: "/doctor/visits",
      icon: ClipboardList,
    },
  ],

  receptionist: [
    {
      label: "Dashboard",
      href: "/receptionist",
      icon: LayoutDashboard,
    },
    {
      label: "Appointments",
      href: "/receptionist/appointments",
      icon: CalendarDays,
    },
    {
      label: "Patients",
      href: "/receptionist/patients",
      icon: Users,
    },
  ],
};
