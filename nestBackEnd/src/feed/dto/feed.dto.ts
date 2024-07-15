export class MediumResponse {
  status: string;
  feed: MediumFeed;
  items: FeedItem[];
}

export class MediumFeed {
  url: string;
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
}

export class FeedItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}
