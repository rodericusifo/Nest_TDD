import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const LOGGER_MAX_SIZE = '10m';
const LOGGER_MAX_FILES = '7d';

@Injectable()
export class WinstonLoggerService {
  createLogger(): winston.LoggerOptions {
    const timestamp: number = moment().valueOf();
    const transports: winston.transport[] = [];

    const configTransportInfo: DailyRotateFile = new DailyRotateFile({
      filename: `%DATE%.log`,
      dirname: `logs/info`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: LOGGER_MAX_SIZE,
      maxFiles: LOGGER_MAX_FILES,
      level: 'info',
    });

    const configTransportError: DailyRotateFile = new DailyRotateFile({
      filename: `%DATE%.log`,
      dirname: `logs/error`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: LOGGER_MAX_SIZE,
      maxFiles: LOGGER_MAX_FILES,
      level: 'error',
    });

    transports.push(configTransportInfo);
    transports.push(configTransportError);

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
