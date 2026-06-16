import AuthBranding from "@/features/auth/components/AuthBranding";
import LoginCard from "@/features/auth/components/LoginCard";

export default function LoginPage() {
  return (
    <section className="container mx-auto min-h-screen px-6 ">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 gap-10 ">
        <AuthBranding />

        <div className="flex items-center justify-center">
          <LoginCard />
        </div>
      </div>
    </section>
  );
}
