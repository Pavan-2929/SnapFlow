import UserAvatar from "@/components/controls/UserAvatar";
import { FollowerInfo, UserData } from "@/lib/types";
import React from "react";
import FollowerCount from "./FollowerCount";
import FollowButton from "@/components/controls/FollowButton";
import EditButton from "@/app/(main)/user/[username]/EditButton";

interface ProfileProps {
  loggedInUserId: string;
  user: UserData;
}

const Profile = ({ loggedInUserId, user }: ProfileProps) => {
  const followerInfo: FollowerInfo = {
    isFollowedByLoggedInUser: user.followers.some(
      ({ followerId }) => followerId === loggedInUserId,
    ),
    totalFollowers: user._count.followers,
  };
  return (
    <div className="flex h-fit w-full flex-col rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-9">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          size={180}
          className="mx-auto flex justify-center"
        />
        <div className="flex items-start justify-between">
          <div className="space-y-5">
            <div className="space-y-1">
              <p className="max-w-[150px] truncate text-wrap text-xl font-bold sm:text-3xl md:max-w-[400px]">
                {user.displayName}
              </p>
              <p className="max-w-[120px] text-muted-foreground md:max-w-[380px]">
                @{user.username}
              </p>
            </div>
            <div>
              <p className="font-medium">
                Memeber Since {user.createdAt.toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-x-5">
              <p className="font-medium">
                Posts: <span className="font-bold">{user._count.posts}</span>
              </p>
              <FollowerCount userId={user.id} initialState={followerInfo} />
            </div>
          </div>
          <div>
            {user.id === loggedInUserId ? (
              <EditButton user={user} />
            ) : (
              <FollowButton userId={user.id} initialState={followerInfo} />
            )}
          </div>
        </div>
        {user.bio && (
          <div className="space-y-3">
            <hr />
            <div className="overflow-hidden whitespace-pre-line break-words">
              {user.bio}
            </div>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
