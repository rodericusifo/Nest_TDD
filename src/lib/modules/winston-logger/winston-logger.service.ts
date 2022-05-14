import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const LOGGER_MAX_SIZE = '10m';
const LOGGER_MAX_FILES = '7d';
enum LOGGER_NAME {
  SYSTEM = 'system',
}

@Injectable()
export class WinstonLoggerService {
  constructor(private configService: ConfigService) {}

  createLogger(): winston.LoggerOptions {
    const loggerSystemEnv: boolean =
      this.configService.get('LOGGER_SYSTEM') || false;
    const timestamp: number = moment().valueOf();
    const transports: winston.transport[] = [];

    const configTransportSystemInfo: DailyRotateFile = new DailyRotateFile({
      filename: `%DATE%.log`,
      dirname: `logs/${LOGGER_NAME.SYSTEM}/info`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: LOGGER_MAX_SIZE,
      maxFiles: LOGGER_MAX_FILES,
      level: 'info',
    });

    const configTransportSystemError: DailyRotateFile = new DailyRotateFile({
      filename: `%DATE%.log`,
      dirname: `logs/${LOGGER_NAME.SYSTEM}/error`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: LOGGER_MAX_SIZE,
      maxFiles: LOGGER_MAX_FILES,
      level: 'error',
    });

    if (loggerSystemEnv) {
      transports.push(configTransportSystemInfo);
      transports.push(configTransportSystemError);
    }

    transports.push(
      new winston.transports.Console({
        silent: true,
      }),
    );

    return {
      defaultMeta: {
        requestId: timestamp,
      },
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
      transports,
    };
  }
}
