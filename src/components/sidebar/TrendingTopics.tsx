import prisma from "@/lib/prisma";
import { formatNumber } from "@/lib/utils";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import React from "react";

const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<
      {
        hashtag: string;
        count: bigint;
      }[]
    >`
            SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
            FROM posts
            GROUP BY (hashtag)
            ORDER BY count DESC, hashtag ASC
            LIMIT 5
        `;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  { revalidate: 3 * 60 * 60 },
);

const TrendingTopics = async () => {
  const tredingTopicsData = await getTrendingTopics();

  return (
    <div className="w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">
        <p>Trending Topics</p>
      </div>
      {tredingTopicsData.map(({ hashtag, count }, index) => {
        const title = hashtag.split("#")[1];

        return (
          <Link href={`/hashtag/${title}`} className="block" key={index}>
            <p className="line-clamp-1 font-semibold hover:underline">
              {hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default TrendingTopics;
