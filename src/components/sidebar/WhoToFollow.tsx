import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { userDataSelect } from "@/lib/types";
import React from "react";
import UserAvatar from "../controls/UserAvatar";
import { Button } from "../ui/button";
import Link from "next/link";

const WhoToFollow = async () => {
  const { user } = await validateRequest();

  if (!user) return null;

  const users = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
    take: 5,
    select: userDataSelect,
  });

  return (
    <div className="w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">
        <p>Users to Follow</p>
      </div>
      {users &&
        users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex gap-3">
              <Link href={`/user/${user.id}`}>
                <UserAvatar avatarUrl={user.avatarUrl} />
              </Link>
              <div>
                <Link href={`/user/${user.id}`}>
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
              <Button>Follow</Button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default WhoToFollow;
