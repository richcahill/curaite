"use client";

import React from "react";
import Logo from "./media/logo";
import { Button } from "./ui/button";
import Link from "next/link";
import { Package, FileImage } from "lucide-react";

const NavigationBar: React.FC = () => {
  const handleSignOut = () => {
    // Logic for signing out the user
    console.log("User signed out");
  };

  const linkStyle =
    "text-gray-500 hover:text-gray-950 transition-all flex gap-2 items-center px-2 py-1 hover:bg-gray-100 rounded-full";

  return (
    <div className="max-w-3xl w-full mx-auto p-2">
      <nav className="grid grid-cols-3 justify-between items-center pl-4 p-2 w-full  rounded-full">
        <div className="logo">
          <Link href="/">
            <Logo className="text-violet-500 h-7 w-7 hover:scale-105 hover:text-violet-400 transition-all dark:text-gray-50" />
          </Link>
        </div>

        <div className="flex justify-center text-sm gap-1">
          <Link href="/assets" className={linkStyle}>
            <FileImage className="w-4 h-4" />
            <p className="">Assets</p>
          </Link>
          <Link href="/projects" className={linkStyle}>
            <Package className="w-4 h-4" />
            <p className="">Projects</p>
          </Link>
        </div>
        <div className="text-right">
          <Button
            onClick={handleSignOut}
            className=" bg-white text-gray-900 shadow-none hover:bg-gray-200 hover:text-gray-950 transition-all"
            size="sm"
            variant="ghost"
          >
            Sign Out
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
