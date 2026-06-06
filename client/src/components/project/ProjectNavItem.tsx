"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProjectNavItemProps {
  href: string;
  label: string;
}

export default function ProjectNavItem({
  href,
  label,
}: ProjectNavItemProps) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-white text-black"
          : "text-zinc-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}