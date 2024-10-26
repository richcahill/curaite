"use client";

import React from "react";
import Logo from "./media/logo";
import { Button } from "./ui/button";
import Link from "next/link";
const NavigationBar: React.FC = () => {
  const handleSignOut = () => {
    // Logic for signing out the user
    console.log("User signed out");
  };

  return (
    <div className="max-w-3xl mx-auto p-2">
      <nav className="flex justify-between items-center pl-4 p-2 w-full bg-gray-100 rounded-full">
        <div className="logo">
          <Link href="/">
            <Logo className="text-gray-400 h-7 w-7 hover:scale-105 hover:text-gray-900 transition-all dark:text-gray-50" />
          </Link>
        </div>
        <div className="">
          {/* ignoring the standard shadcn button variants here just for sign out */}
          <Button
            onClick={handleSignOut}
            className="rounded-full bg-white text-gray-900 shadow-none hover:bg-gray-200 hover:text-gray-950 transition-all"
            size="sm"
          >
            Sign Out
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
