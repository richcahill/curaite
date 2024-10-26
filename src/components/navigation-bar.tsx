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
    <nav className="flex justify-between items-center p-4 max-w-3xl mx-auto">
      <div className="logo">
        <Link href="/">
          <Logo className="text-gray-300 h-8 w-8 hover:scale-105 hover:text-gray-900 transition-all dark:text-gray-50" />
        </Link>
      </div>
      <div className="">
        <Button onClick={handleSignOut} variant="ghost">
          Sign Out
        </Button>
      </div>
    </nav>
  );
};

export default NavigationBar;
