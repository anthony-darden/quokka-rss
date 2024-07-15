import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entity/feed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feed])],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
