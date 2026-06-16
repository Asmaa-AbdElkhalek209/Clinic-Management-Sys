"use client";

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Header({ title, children }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-[#121212]">
      <h1 className="text-2xl font-bold">{title}</h1>

      {children}
    </header>
  );
}
