"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/media/logo";

export default function Home() {
  // TODO: redirect to /app if user is logged in

  return (
    // TODO: add a nice... interactive(?) background
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8 flex flex-col items-center">
        <div className="flex flex-col items-center gap-2 justify-between">
          <Logo className="text-violet-500 h-32 w-32 hover:scale-105 hover:text-violet-400 transition-all dark:text-gray-50" />
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white">
            curaite.work
          </h1>
        </div>
        <div className="space-y-2 flex flex-col items-stretch max-w-80">
          <Link href="/register">
            <Button size="lg" className="w-full">
              Create an account
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
