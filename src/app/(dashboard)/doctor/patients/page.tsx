import PatientsPageContent, {
  type PatientsPageProps,
} from "@/features/dashboard/patients/pages/PatientsPageContent";

export default function Page(props: PatientsPageProps) {
  return <PatientsPageContent {...props} />;
}
