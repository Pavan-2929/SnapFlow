"use client";

import useFollowerInfo from "@/hooks/useFollowerInfo";
import kyInstance from "@/lib/ky";
import { FollowerInfo } from "@/lib/types";
import {
  QueryFilters,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

const FollowButton = ({ userId, initialState }: FollowButtonProps) => {
  const { data } = useFollowerInfo(userId, initialState);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const queryKey: QueryKey = ["follower-info", userId];

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByLoggedInUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const preivousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        totalFollowers:
          (preivousState?.totalFollowers || 0) +
          (preivousState?.isFollowedByLoggedInUser ? -1 : 1),
        isFollowedByLoggedInUser: !preivousState?.isFollowedByLoggedInUser,
      }));
      return { preivousState };
    },
    onError(error, vaiable, context) {
      queryClient.setQueryData(queryKey, context?.preivousState);
      console.log(error);
      toast({
        variant: "destructive",
        description: "An error occurred while trying to follow/unfollow user",
      });
    },
  });
  return (
    <Button
      variant={data.isFollowedByLoggedInUser ? "secondary" : "default"}
      onClick={() => mutate()}
    >
      {data.isFollowedByLoggedInUser ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
