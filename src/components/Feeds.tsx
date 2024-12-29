import FollowingFeed from "@/app/(main)/FollowingFeed";
import ForYouFeed from "@/app/(main)/ForYouFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Feeds = () => {
  return (
    <Tabs defaultValue="for-you" className="">
      <TabsList>
        <TabsTrigger value="for-you">For-You</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
      <TabsContent value="for-you">
        <ForYouFeed />
      </TabsContent>
      <TabsContent value="following">
        <FollowingFeed />
      </TabsContent>
    </Tabs>
  );
};

export default Feeds;
