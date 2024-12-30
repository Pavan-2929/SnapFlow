import PostEditor from "@/components/posts/editor/PostEditor";
import Feeds from "@/components/Feeds";
import TrendsSidebar from "@/components/sidebar/TrendsSidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex gap-5 w-full">
      <div className="space-y-5 w-full">
        <PostEditor />
        <Feeds />
      </div>
      <TrendsSidebar />
    </div>
  );
}
