import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { title } from "process";
import React, { cache } from "react";
import Profile from "./Profile";
import TrendsSidebar from "@/components/sidebar/TrendsSidebar";
import { getUserDataSelect } from "@/lib/types";
import UsersPosts from "./UsersPosts";

interface ProfilePageProps {
  params: { username: string };
}

const getUser = cache(async (username: string, loggeedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggeedInUserId),
  });

  if (!user) notFound();
  return user;
});

export async function generateMetadata({
  params: { username },
}: ProfilePageProps) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    return null;
  }

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

const ProfilePage = async ({ params: { username } }: ProfilePageProps) => {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    return null;
  }

  const user = await getUser(username, loggedInUser.id);

  return (
    <div className="flex w-full gap-5">
      <div className="w-full space-y-5">
        <Profile loggedInUserId={loggedInUser.id} user={user} />
        <div className="rounded-2xl bg-card py-3 text-center text-xl font-bold shadow-sm">
          {user.username}'s Posts
        </div>
        <UsersPosts userId={user.id} />
      </div>
      <div>
        <TrendsSidebar />
      </div>
    </div>
  );
};

export default ProfilePage;
