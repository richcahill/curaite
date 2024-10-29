"use client";

import React, { useEffect, useState } from "react";
import Logo from "./media/logo";
import { Button } from "./ui/button";
import Link from "next/link";
import { Package, FileImage, LogOut } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const NavigationBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user) {
      setUser(user.email!);
    }
  }, []);

  const handleSignOut = async () => {
    await signOut(getAuth(app));

    await fetch("/api/logout");

    router.push("/login");
  };

  const linkStyle =
    "text-gray-500 hover:text-gray-950 transition-all flex gap-2 items-center px-2 py-1 hover:bg-gray-100 rounded-full";

  const activeLinkStyle =
    "text-gray-950 bg-gray-100 rounded-full transition-all flex gap-2 items-center px-2 py-1";

  return (
    <div className="max-w-3xl w-full mx-auto p-2 sticky top-0 z-50 bg-white/50 backdrop-blur-md">
      <nav className="grid grid-cols-3 justify-between items-center pl-4 p-2 w-full rounded-full">
        <div className="logo">
          <Link href="/app">
            <Logo className="text-violet-500 h-7 w-7 hover:scale-105 hover:text-violet-400 transition-all dark:text-gray-50" />
          </Link>
        </div>

        <div className="flex justify-center text-sm gap-1">
          <Link
            href="/app/assets"
            className={pathname === "/app/assets" ? activeLinkStyle : linkStyle}
          >
            <FileImage className="w-4 h-4" />
            <p className="">Assets</p>
          </Link>
          <Link
            href="/app/projects"
            className={
              pathname === "/app/projects" ? activeLinkStyle : linkStyle
            }
          >
            <Package className="w-4 h-4" />
            <p className="">Projects</p>
          </Link>
        </div>
        <div className="text-right flex items-center justify-end gap-2">
          {user && <p className="text-sm text-gray-500">{user}</p>}
          <Button
            onClick={handleSignOut}
            className=" bg-white text-gray-900 shadow-none hover:bg-gray-200 hover:text-gray-950 transition-all"
            size="icon"
            variant="ghost"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
