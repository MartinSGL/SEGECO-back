import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService],
  imports: [ConfigModule, UsersModule],
})
export class SeedsModule {}
