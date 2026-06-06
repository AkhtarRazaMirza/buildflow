import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur px-6">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          BuildFlow
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a
            href="#features"
            className="transition-colors hover:text-white"
          >
            Features
          </a>

          <a
            href="#workflow"
            className="transition-colors hover:text-white"
          >
            Workflow
          </a>

          <a
            href="#how-it-works"
            className="transition-colors hover:text-white"
          >
            How It Works
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={"/signup"}
            className="hidden rounded-lg px-4 py-2 text-sm text-zinc-400 transition-colors hover:text-white md:block">
            Sign In
          </Link>

          <Link
            href={"/signup"}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
