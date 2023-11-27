import { Module } from '@nestjs/common';
import { FleetsService } from './fleets.service';
import { FleetsController } from './fleets.controller';
import { Fleet, FleetSchema } from './entities/fleet.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [FleetsController],
  providers: [FleetsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Fleet.name,
        schema: FleetSchema,
      },
    ]),
  ],
  exports: [FleetsService],
})
export class FleetsModule {}
