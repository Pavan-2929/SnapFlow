import PostEditor from "@/components/posts/editor/PostEditor";
import Post from "@/components/posts/Post";
import prisma from "@/lib/prisma";
import { PostDataInclude } from "@/lib/types";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: PostDataInclude,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="min-h-screen w-full">
      <div className="space-y-5">
        <PostEditor />
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </div>
  );
}
