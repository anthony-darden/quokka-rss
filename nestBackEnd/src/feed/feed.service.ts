import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from './entity/feed.entity';
import { MediumResponse, FeedItem } from './dto/feed.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private feedRepository: Repository<Feed>,
  ) {}

  getRssJsonUrl = (tagName: string) => {
    const url = `https://medium.com/feed/tag/${tagName}`;
    const encodedUrl = encodeURIComponent(url);
    return `https://api.rss2json.com/v1/api.json?rss_url=${encodedUrl}`;
  };

  formatItems(items: FeedItem[], tagName: string) {
    return items.map((item) => ({
      title: item.title,
      pubDate: new Date(item.pubDate),
      author: item.author,
      description: item.description,
      link: item.link,
      tagName,
    }));
  }

  async getPaginatedFeeds(page: number, pageSize: number, tagName: string) {
    const offset = (page - 1) * pageSize;
    const [rows, count] = await this.feedRepository.findAndCount({
      where: { tagName },
      order: { pubDate: 'DESC' },
      take: pageSize,
      skip: offset,
    });

    return {
      total: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
      feeds: rows,
    };
  }

  async getAllFeeds(page: number, pageSize: number, tagName: string) {
    let updatedItems;
    const formattedUrl = this.getRssJsonUrl(tagName as string);
    const response = await fetch(formattedUrl);
    const data: MediumResponse = await response.json();

    // Since medium api doesn't support the filter by date
    // manually checks for the latest feeds and update the DB with the latest feeds
    if (data.status === 'ok' && data?.items?.length > 0) {
      const latestFeed = await this.feedRepository.find({
        where: { tagName },
        order: { pubDate: 'DESC' },
        take: 1,
      });

      if (latestFeed.length === 0) {
        updatedItems = this.formatItems(data.items, tagName as string);
      } else {
        const newItems = data?.items.filter(
          (item) => new Date(item.pubDate) > new Date(latestFeed[0].pubDate),
        );
        updatedItems = this.formatItems(newItems, tagName as string);
      }

      if (updatedItems?.length > 0) {
        await this.feedRepository.save(updatedItems);
      }
    }

    const result = await this.getPaginatedFeeds(
      page as number,
      pageSize as number,
      tagName as string,
    );

    return result;
  }

  async markAsRead(id: number): Promise<Feed> {
    const feed = await this.feedRepository.findOne({ where: { id } });
    if (!feed) {
      throw new NotFoundException('Feed not found');
    }
    feed.isRead = true;
    return this.feedRepository.save(feed);
  }
}
