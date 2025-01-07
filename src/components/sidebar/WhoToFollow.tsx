import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import React from "react";
import UserAvatar from "../controls/UserAvatar";
import Link from "next/link";
import FollowButton from "../controls/FollowButton";
import { getUserDataSelect } from "@/lib/types";

interface WhoToFollowProps {
  takeUsers: number;
}

const WhoToFollow = async ({ takeUsers }: WhoToFollowProps) => {
  const { user } = await validateRequest();

  if (!user) return null;

  const users = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      followers: {
        none: {
          followerId: user.id,
        },
      },
    },
    take: takeUsers,
    select: getUserDataSelect(user.id),
  });

  return (
    <div className="max-h-screen w-full space-y-5 overflow-y-auto rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">
        <p>Users to Follow</p>
      </div>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex gap-3">
              <Link href={`/user/${user.username}`}>
                <UserAvatar avatarUrl={user.avatarUrl} />
              </Link>
              <div>
                <Link href={`/user/${user.username}`}>
                  <p className="line-clamp-1 font-semibold hover:underline">
                    @{user.username}
                  </p>
                </Link>
                <p className="line-clamp-1 text-muted-foreground">
                  {user.displayName}
                </p>
              </div>
            </div>
            <div>
              <FollowButton
                userId={user.id}
                initialState={{
                  totalFollowers: user._count.followers,
                  isFollowedByLoggedInUser: user.followers.some(
                    ({ followerId }) => followerId === user.id,
                  ),
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">
          No users to follow at the moment.
        </p>
      )}
    </div>
  );
};

export default WhoToFollow;
