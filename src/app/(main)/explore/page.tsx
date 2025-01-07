import PostEditor from "@/components/posts/editor/PostEditor";
import Feeds from "@/components/Feeds";
import TrendsSidebar from "@/components/sidebar/TrendsSidebar";
import Explore from "./Explore";

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen w-full gap-5">
      <div className="w-full space-y-5">
        <Explore />
      </div>
    </div>
  );
}
