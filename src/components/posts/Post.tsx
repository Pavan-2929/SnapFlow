import { PostData } from "@/lib/types";
import React from "react";
import UserAvatar from "../controls/UserAvatar";
import moment from "moment";
import Link from "next/link";

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps) => {
  return (
    <div className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Link href={`/user/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.avatarUrl} />
        </Link>
        <div className="space-y-0.5">
          <Link
            href={`/user/${post.user.username}`}
            className="font-medium hover:underline"
          >
            {post.user.displayName}
          </Link>
          <p className="text-sm text-muted-foreground">
            {moment(post.createdAt).fromNow()}
          </p>{" "}
        </div>
      </div>
      <div>
        <p className="whitespace-pre-line break-words">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
