"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
      >
        <span className="text-sm font-medium text-white">
          A
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-3xl border border-white/10 bg-[#111111] shadow-2xl">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-sm font-medium text-white">
              Akhtar Raza
            </p>

            <p className="text-xs text-zinc-500">
              akhtar@example.com
            </p>
          </div>

          <div className="p-2">
            <Link
              href="/dashboard"
              className="block rounded-xl px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/settings"
              className="block rounded-xl px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
            >
              Settings
            </Link>

            <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}