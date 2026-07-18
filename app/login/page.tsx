"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { authenticateAdmin, isAdminAuthenticated } from "@/lib/admin-auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdminAuthenticated()) {
      router.replace("/admin");
    }
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!authenticateAdmin(username, password)) {
      setError("The username or password is incorrect.");
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="grid min-h-screen bg-[#fbf8f1] lg:grid-cols-[0.9fr_1.1fr]">
      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#5c4033]"
        >
          <ArrowLeft size={15} /> Back to website
        </Link>

        <div className="my-auto w-full max-w-md py-12 lg:mx-auto">
          <div className="grid h-12 w-12 place-items-center bg-[#5c4033] text-white">
            <LockKeyhole size={21} />
          </div>
          <p className="eyebrow mt-7">Private workspace</p>
          <h1 className="display-font mt-3 text-5xl leading-none text-[#2b1d17]">
            Admin login
          </h1>
          <p className="mt-5 text-sm leading-7 text-[#75685f]">
            Sign in to review, confirm and manage salon appointment requests.
          </p>

          <form onSubmit={handleSubmit} className="mt-9 grid gap-5">
            <label className="grid gap-2 text-sm font-bold text-[#4c3d35]">
              Username
              <div className="relative">
                <UserRound
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b7d75]"
                />
                <input
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="field pl-10"
                  placeholder="Enter username"
                />
              </div>
            </label>

            <label className="grid gap-2 text-sm font-bold text-[#4c3d35]">
              Password
              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b7d75]"
                />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="field px-10"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center text-[#75685f]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </label>

            {error && (
              <p
                role="alert"
                className="border-l-2 border-[#9a433d] bg-[#f7e9e6] px-4 py-3 text-xs font-semibold text-[#7d3934]"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-1 flex h-13 items-center justify-center gap-3 bg-[#5c4033] px-6 text-sm font-bold text-white transition hover:bg-[#3f2b22]"
            >
              Login to admin <ArrowRight size={17} />
            </button>
          </form>

          <p className="mt-6 flex items-center gap-2 text-xs leading-5 text-[#8b7d75]">
            <ShieldCheck size={15} className="shrink-0 text-[#5c4033]" />
            Your admin session ends when this browser session closes.
          </p>
        </div>

        <p className="text-xs text-[#9b8e86]">
          © 2026 Helen Friends Hair Salon
        </p>
      </section>

      <section className="relative hidden min-h-screen overflow-hidden bg-[#2b1d17] lg:block">
        <Image
          src="/images/hair1.jpg"
          alt="Helen Friends Hair Salon signature styling"
          fill
          priority
          sizes="55vw"
          className="object-cover object-[center_28%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b1d17]/80 via-[#2b1d17]/5 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 max-w-xl text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c2b280]">
            Salon operations
          </p>
          <p className="display-font mt-4 text-4xl leading-tight">
            Every appointment, thoughtfully managed.
          </p>
        </div>
      </section>
    </main>
  );
}
