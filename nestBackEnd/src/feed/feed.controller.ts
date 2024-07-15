import { Controller, Get, Query, Put, Param } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getAllFeeds(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('tagName') tagName: string = 'dev',
  ) {
    return this.feedService.getAllFeeds(page, pageSize, tagName);
  }

  @Put(':id')
  async updateFeed(@Param('id') id: string) {
    return this.feedService.markAsRead(Number(id));
  }
}
