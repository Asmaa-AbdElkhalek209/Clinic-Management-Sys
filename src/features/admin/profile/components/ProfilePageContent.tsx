import ProfileForm from "./ProfileForm";
import { getSpecialities } from "../../admin/users/actions/get-specialities.action";

export default async function ProfilePageContent() {
  const specialities = await getSpecialities();

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
        <ProfileForm specialities={specialities} />
      </div>
    </div>
  );
}
