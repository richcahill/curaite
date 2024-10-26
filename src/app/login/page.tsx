"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Logo from "@/components/media/logo";

export default function Login() {
  // TODO should probably swap this out for a react-hook-form + zod validation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      const idToken = await credential.user.getIdToken();

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      router.push("/app");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    // TODO: add a nice... interactive(?) background
    // TODO: this is a bit DRY with the register page - could we abstract this out into a component?
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center gap-2 justify-between">
          <h1 className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login
          </h1>
          <Logo className="text-violet-500 scale-x-[-1] h-10 w-10 hover:scale-105 hover:text-violet-400 transition-all dark:text-gray-50" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" action="#">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <div
                className="bg-red-100 border text-sm border-red-400 text-red-700 px-3 py-2 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <Button type="submit" className="w-full">
              Enter
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-gray-600 hover:underline dark:text-gray-500"
              >
                Register here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
