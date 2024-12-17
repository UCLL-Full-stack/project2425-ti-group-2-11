"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, User, Search } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <img
                src="/logo-512.svg"
                alt="Logo User Bazaar"
                className="h-8 w-auto sm:h-10 cursor-pointer transition-transform hover:scale-105"
              />
            </Link>
          </div>

          <div className="hidden sm:flex items-center flex-1 px-4 flex justify-center">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder={t("navbar.search")}
                className="w-full py-2 pl-4 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Link href={isLoggedIn ? "/profile" : "/login"}>
              <User className="h-6 w-6 text-gray-600 cursor-pointer mr-4 transition-colors hover:text-blue-500" />
            </Link>
            <Link href={isLoggedIn ? "/cart" : "/login"}>
              <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer transition-colors hover:text-blue-500" />
            </Link>
            <button
              className="ml-4 sm:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search className="h-6 w-6 text-gray-600 transition-colors hover:text-blue-500" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isSearchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-2">
          <div className="relative">
            <input
              type="text"
              placeholder={t("navbar.search")}
              className="w-full py-2 pl-4 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
