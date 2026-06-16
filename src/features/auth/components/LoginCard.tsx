"use client";

import { useLogin } from "../hooks/auth.hooks";

export default function LoginCard() {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } = useLogin();

  return (
    <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <p className="mt-2 text-gray-500">Sign in to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>

          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="h-11 w-full rounded-lg border px-3 outline-none"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium">Password</label>

          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="h-11 w-full rounded-lg border px-3 outline-none"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="h-11 w-full rounded-lg bg-blue-500 text-white font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
