import React from "react";
import { Skeleton } from "../ui/skeleton";

const PostsSkeletonLoader = () => {
  return (
    <>
      <PostSkeletonLoader />
      <PostSkeletonLoader />
      <PostSkeletonLoader />
      <PostSkeletonLoader />
      <PostSkeletonLoader />
    </>
  );
};

export default PostsSkeletonLoader;

const PostSkeletonLoader = () => {
  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-40"></Skeleton>
          <Skeleton className="h-4 w-20"></Skeleton>
        </div>
      </div>
      <Skeleton className="h-24 w-full"/>
    </div>
  );
};