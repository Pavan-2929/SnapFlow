"use client";

import React from "react";
import { Button } from "./ui/button";
import { Home, Compass, User2Icon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import logout from "@/app/(auth)/actions";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/app/(main)/SessionProvider";

interface MenuBarProps {
  className?: string;
}

const Menubar = ({ className }: MenuBarProps) => {
  const QueryClient = useQueryClient();

  const { user } = useSession();

  return (
    <div className={className}>
      <Button
        asChild
        variant="ghost"
        title="Home"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/">
          <Home />
          <p className="hidden lg:inline">Home</p>
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        title="Profile"
        className="flex items-center justify-start gap-3"
      >
        <Link href={`/user/${user.username}`}>
          <User2Icon />
          <p className="hidden lg:inline">Profile</p>
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        title="Explore"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/explore">
          <Compass />
          <p className="hidden lg:inline">Explore</p>
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        title="Bookmarks"
        className="flex cursor-pointer items-center justify-start gap-3"
      >
        <div
          onClick={() => {
            logout();
            QueryClient.clear();
          }}
        >
          <LogOutIcon />
          <p className="hidden lg:inline">Logout</p>
        </div>
      </Button>
    </div>
  );
};

export default Menubar;
