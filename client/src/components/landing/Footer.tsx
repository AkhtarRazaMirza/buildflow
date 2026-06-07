
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 animate-fade-in">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              BuildFlow
            </h3>

            <p className="mt-2 max-w-md text-sm text-zinc-500">
              AI-powered project management for developers,
              students, and builders.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-zinc-500">
            <Link
              href="#features"
              className="transition-colors hover:text-white"
            >
              Features
            </Link>

            <Link
              href="#workflow"
              className="transition-colors hover:text-white"
            >
              Workflow
            </Link>

            <Link
              href="#how-it-works"
              className="transition-colors hover:text-white"
            >
              How It Works
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} BuildFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}