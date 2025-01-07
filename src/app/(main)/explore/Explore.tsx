import TrendingTopics from "@/components/sidebar/TrendingTopics";
import WhoToFollow from "@/components/sidebar/WhoToFollow";
import React from "react";

const Explore = () => {
  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <WhoToFollow takeUsers={Number.MAX_SAFE_INTEGER} />
      <TrendingTopics />
    </div>
  );
};

export default Explore;
