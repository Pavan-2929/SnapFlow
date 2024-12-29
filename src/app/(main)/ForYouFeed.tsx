"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/posts/Post";
import PostsSkeletonLoader from "@/components/skeletonLoaders/PostsSkeletonLoader";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

const ForYouFeed = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", "for-you"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/for-you",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return <PostsSkeletonLoader />;
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occured while fetching posts
      </p>
    );
  }


  return (
    <InfiniteScrollContainer
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      className="space-y-5"
    >
      {posts && posts.length > 0 ? (
        posts.map((post) => <Post post={post} key={post.id} />)
      ) : (
        <p className="my-3 text-center text-xl font-medium">
          No posts found | add one.
        </p>
      )}
      {isFetchingNextPage && <Loader2 className="mx-auto my-5 animate-spin" />}
    </InfiniteScrollContainer>
  );
};

export default ForYouFeed;
