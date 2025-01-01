import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import Profile from "./Profile";
import TrendsSidebar from "@/components/sidebar/TrendsSidebar";
import { getUserDataSelect } from "@/lib/types";
import UsersPosts from "./UsersPosts";

type Params = Promise<{ username: string }>;

interface ProfilePageProps {
  params: Params;
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });

  if (!user) notFound();
  return user;
});

export async function generateMetadata({ params }: ProfilePageProps) {
  const resolvedParams = await params; // Await the params promise
  const username = resolvedParams.username;

  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const resolvedParams = await params; // Await the params promise
  const username = resolvedParams.username;

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
          {user.username}&apos;s Posts
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
