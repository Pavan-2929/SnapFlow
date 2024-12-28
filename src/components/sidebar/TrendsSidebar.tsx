import React, { Suspense } from "react";
import WhoToFollow from "./WhoToFollow";
import { Loader2 } from "lucide-react";
import TrendingTopics from "./TrendingTopics";

const TrendsSidebar = () => {
  return (
    <div className="sticky top-[5.5rem] hidden h-fit w-72 flex-none space-y-5 shadow-sm md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto size-6 animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
};

export default TrendsSidebar;
