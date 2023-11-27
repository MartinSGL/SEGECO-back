import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { FleetsModule } from 'src/fleets/fleets.module';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService],
  imports: [ConfigModule, UsersModule, CompaniesModule, FleetsModule],
})
export class SeedsModule {}
