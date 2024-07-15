import { getAllFeeds, markAsRead } from "../services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FeedResponse } from "../types";

type Params = {
  tagName: string;
  pageSize: number;
  page: number;
};

export function useFeeds({ tagName, pageSize, page }: Params) {
  const { setQueryData } = useQueryClient();
  const { data, isFetching, refetch, error } = useQuery({
    queryKey: [tagName, page, pageSize],
    queryFn: () => getAllFeeds(tagName, page, pageSize),
  });

  const { mutate } = useMutation({
    mutationFn: markAsRead,
    onSuccess: (data) =>
      setQueryData([tagName, page, pageSize], (old: FeedResponse) => {
        return old.feeds.map((feed) =>
          feed.id === data.id ? { ...feed, isRead: true } : feed
        );
      }),
  });

  return { data, isFetching, error, refetch, mutate };
}
