import PostEditor from "@/components/posts/editor/PostEditor";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import ForYouFeed from "./ForYouFeed";
import PostsSkeletonLoader from "@/components/skeletonLoaders/PostsSkeletonLoader";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="min-h-screen w-full">
      <div className="space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
    </div>
  );
}
