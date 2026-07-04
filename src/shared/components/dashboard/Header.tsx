"use client";

type HeaderProps = {
  title: string;
  description?: string;
};

export default function Header({ title, description }: HeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
