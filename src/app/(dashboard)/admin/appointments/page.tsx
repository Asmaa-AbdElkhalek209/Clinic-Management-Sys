import AppointmentsPageContent, {
  type AppointmentsPageProps,
} from "@/features/dashboard/appointments/pages/AppointmentsPageContent";

export default function Page(props: AppointmentsPageProps) {
  return <AppointmentsPageContent {...props} />;
}
