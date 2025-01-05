import React from "react";
import Searchbar from "./controls/Searchbar";
import ThemeToggler from "./ThemeToggler";
import UserButton from "./UserButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky left-0 top-0 z-50 bg-card border border-b">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-4 px-5 py-3 sm:gap-y-0">
        <div className="text-2xl font-bold text-primary">
          <Link href="/">SnapFlow</Link>
        </div>
        <Searchbar className="order-3 mx-auto hidden w-full max-w-[400px] sm:order-2 sm:mx-0 sm:w-auto md:block" />
        <div className="order-2 ms-auto flex items-center sm:order-3">
          <ThemeToggler />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
