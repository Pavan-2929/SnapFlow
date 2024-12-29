import PostEditor from "@/components/posts/editor/PostEditor";
import ForYouFeed from "./ForYouFeed";
import Feeds from "@/components/Feeds";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <div className="space-y-5">
        <PostEditor />
        {/* <ForYouFeed /> */}
        <Feeds />
      </div>
    </div>
  );
}
