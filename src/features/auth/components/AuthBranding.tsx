export default function AuthBranding() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center">
      <div className="max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500 text-white text-2xl font-bold">
            C
          </div>

          <div>
            <h1 className="text-2xl font-bold">Clinic Management</h1>

            <p className="text-muted-foreground">Management System</p>
          </div>
        </div>

        <h2 className="mb-4 text-4xl font-bold leading-tight">
          Manage your clinic efficiently.
        </h2>

        <p className="text-lg text-muted-foreground">
          Patients, appointments, visits, prescriptions and reports all in one
          place.
        </p>
      </div>
    </div>
  );
}
