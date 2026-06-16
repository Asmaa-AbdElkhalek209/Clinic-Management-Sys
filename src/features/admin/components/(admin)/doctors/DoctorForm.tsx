"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";
import Image from "next/image";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";

import {
  DoctorFormData,
  doctorSchema,
} from "@/features/admin/schemas/doctor.schema";

import { useAddDoctor } from "@/features/admin/hooks/useAddDoctor";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export default function DoctorFormModal({ open, setOpen }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const { addDoctor, isLoading } = useAddDoctor();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
    mode: "onBlur",
  });

  const file = watch("file");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("file", e.target.files as any);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: DoctorFormData) => {
    addDoctor(data);

    reset();
    setOpen(false);
    setPreview(null);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-2xl rounded-sm p-6 space-y-5 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Doctor</h2>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Name */}
          <div className="col-span-2">
            <Input placeholder="Doctor Name" {...register("name")} />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* Speciality */}
          <div>
            <Input placeholder="Speciality" {...register("speciality")} />
            <p className="text-red-500 text-sm">{errors.speciality?.message}</p>
          </div>

          {/* Experience */}
          <div>
            <Input
              type="number"
              placeholder="Experience Years"
              {...register("experienceYears")}
            />
            <p className="text-red-500 text-sm">
              {errors.experienceYears?.message}
            </p>
          </div>

          {/* Fees */}
          <div>
            <Input type="number" placeholder="Fees" {...register("fees")} />
            <p className="text-red-500 text-sm">{errors.fees?.message}</p>
          </div>

          {/* File Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm"
            />
            <p className="text-red-500 text-sm">
              {errors.file?.message as string}
            </p>
          </div>

          {/* Preview */}
          {preview && (
            <div className="col-span-2 flex justify-center">
              <Image
                src={preview}
                alt="doctor preview"
                width={96}
                height={96}
                className="rounded-full object-cover border"
              />
            </div>
          )}

          {/* About */}
          <div className="col-span-2">
            <Textarea
              placeholder="About Doctor"
              {...register("about")}
              className="min-h-[100px]"
            />
            <p className="text-red-500 text-sm">{errors.about?.message}</p>
          </div>

          {/* Actions */}
          <div className="col-span-2 flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setPreview(null);
                setOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="bg-blue-400 text-white"
            >
              {isLoading ? "Saving..." : "Save Doctor"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
