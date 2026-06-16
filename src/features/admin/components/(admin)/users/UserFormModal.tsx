"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/components/ui/select";
import { UserFormData, userSchema } from "@/features/admin/schemas/user.schema";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export default function UserFormModal({ open, setOpen }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    defaultValues: {
      role: "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    console.log("USER DATA:", data);

    // TODO: API CALL

    reset();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 text-[#444444]">
      <div className="bg-white w-full max-w-lg rounded-sm p-6 space-y-5 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add User</h2>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Input
              placeholder="Full Name"
              {...register("name")}
              className="rounded-sm"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* Email */}
          <div>
            <Input
              placeholder="Email"
              {...register("email")}
              className="rounded-sm"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* Role Select */}
          <div>
            <Select onValueChange={(value) => setValue("role", value)}>
              <SelectTrigger className="rounded-sm w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Doctor">Doctor</SelectItem>
                <SelectItem value="Receptionist">Receptionist</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-red-500 text-sm">{errors.role?.message}</p>
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="rounded-sm"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="rounded-sm"
            />
            <p className="text-red-500 text-sm">
              {errors.confirmPassword?.message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-sm "
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-sm bg-blue-400 hover:bg-blue-500 text-white"
            >
              {isSubmitting ? "Saving..." : "Save User"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
