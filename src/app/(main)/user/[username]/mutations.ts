import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateProfile } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { PostsPage } from "@/lib/types";

export function useProfileUpdateMutation() {
  const { toast } = useToast();

  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: async (updatedUser) => {
      const queryFilter = {
        queryKey: ["posts"],
      } satisfies QueryFilters;

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.map((post) => {
                if (post.userId === updatedUser.id) {
                  return {
                    ...post,
                    user: {
                      ...updatedUser,
                    },
                  };
                }
                return post;
              }),
            })),
          };
        },
      );
      router.refresh();

      toast({
        description: "Profile updated successfully",
      });
    },
    onError(error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Failed to update profile | try again",
      });
    },
  });

  return mutation;
}
