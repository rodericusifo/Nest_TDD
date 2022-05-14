import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { DatabaseModule } from '@app/database/database.module';
import { ErrorFilter } from '@lib/filters/error.filter';
import { ResponseModule } from '@lib/modules/response/response.module';
import { WinstonLoggerModule } from '@lib/modules/winston-logger/winston-logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { UsersModule } from '@app/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'environment/.env',
      isGlobal: true,
      cache: true,
    }),
    WinstonLoggerModule,
    DatabaseModule,
    ResponseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule {}
