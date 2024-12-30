"use client";

import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import React from "react";

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

const FollowerCount = ({ userId, initialState }: FollowerCountProps) => {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <p className="font-semibold">
      Followers:{" "}
      <span className="font-bold">{formatNumber(data.totalFollowers)}</span>
    </p>
  );
};

export default FollowerCount;
