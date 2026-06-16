import { redirect } from "next/navigation";

export default function DashboardPage() {
  // مؤقتًا
  const role = "admin";

  if (role === "admin") redirect("/admin");
  if (role === "doctor") redirect("/doctor");
  if (role === "receptionist") redirect("/receptionist");

  return null;
}
