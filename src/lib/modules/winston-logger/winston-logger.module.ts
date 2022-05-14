import { WinstonLoggerService } from '@lib/modules/winston-logger/winston-logger.service';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [WinstonLoggerService],
      imports: [WinstonLoggerModule],
      useFactory: (loggerFileService: WinstonLoggerService) =>
        loggerFileService.createLogger(),
    }),
  ],
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService],
})
export class WinstonLoggerModule {}
