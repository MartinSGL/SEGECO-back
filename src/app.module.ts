import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JoiValidationSchema } from './config/joi.validation';
import { CommonModule } from './common/common.module';
import { SeedsModule } from './seeds/seeds.module';
import { EnvConfiguration } from './config/app.config';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    // allow to read enviroment variables from .env file
    // without using process.env way
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    // conection to mongo db
    MongooseModule.forRoot(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    }),
    UsersModule,
    CommonModule,
    SeedsModule,
    CompaniesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
