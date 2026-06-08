"use client";

import { useState } from "react";
import { register } from "@/src/lib/auth";
import { useRouter } from "next/navigation";
import Alert from "@/src/components/ui/Alert";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      await register(
        fullName,
        email,
        password
      );

      setSuccess(
        "Account created successfully"
      );

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white animate-fade-in">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden border-r border-white/10 lg:flex">
          <div className="flex w-full flex-col justify-between p-12">
            <div>
              <h1 className="text-2xl font-bold">
                BuildFlow
              </h1>
            </div>

            <div>
              <h2 className="text-5xl font-bold leading-tight">
                Plan.
                <br />
                Research.
                <br />
                Execute.
              </h2>

              <p className="mt-6 max-w-md text-lg text-zinc-400">
                AI-powered project management built for
                developers, students, and builders.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
              <div className="space-y-4">
                <div className="rounded-xl bg-[#181818] p-4">
                  <p className="text-sm text-zinc-500">
                    You
                  </p>

                  <p className="mt-2">
                    Create a roadmap for my AI Project
                    Manager.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#141414] p-4">
                  <p className="text-sm text-zinc-500">
                    BuildFlow AI
                  </p>

                  <p className="mt-2 text-zinc-300">
                    Generated a roadmap with milestones,
                    tasks, research goals, and execution
                    phases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-4xl font-bold">
                Create your account
              </h2>

              <p className="mt-3 text-zinc-400">
                Start building with BuildFlow.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {error && (
                <Alert
                  type="error"
                  message={error}
                />
              )}

              {success && (
                <Alert
                  type="success"
                  message={success}
                />
              )}

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Full Name
                </label>

                <input
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 outline-none transition focus:border-white/20"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 outline-none transition focus:border-white/20"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 outline-none transition focus:border-white/20"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white py-3 font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}