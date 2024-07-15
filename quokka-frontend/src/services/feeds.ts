import { backend } from "../backend";

import { Feed, FeedResponse } from "../types";

export async function getAllFeeds(
  tagName: string,
  page: number,
  pageSize: number
): Promise<FeedResponse> {
  const response = await backend.get(
    `feed?tagName=${tagName}&page=${page}&pageSize=${pageSize}`
  );
  return response.data;
}

export async function markAsRead(id: string): Promise<Feed> {
  const response = await backend.put(`feed/${id}`);
  return response.data;
}
