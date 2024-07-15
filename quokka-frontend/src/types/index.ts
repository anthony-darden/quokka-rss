export interface Feed {
  id: number;
  title: string;
  pubDate: string;
  author: string;
  description: string;
  link: string;
  createAt: string;
  isRead: string;
  tagname: string;
}

export interface FeedResponse {
  total: number;
  totalPages: number;
  currentPage: string;
  feeds: Feed[];
}
