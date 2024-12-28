import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import submitPost from "./actions";
import { useToast } from "@/hooks/use-toast";
import { PostsPage } from "@/lib/types";

export function SubmitPostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: (newPost) => {
      const queryFilter = {
        queryKey: ["posts", "for-you"],
      } satisfies QueryFilters;

      queryClient.invalidateQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast({
        description: "Post created",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Failed to submit post | try again",
      });
    },
  });
  return mutation;
}
