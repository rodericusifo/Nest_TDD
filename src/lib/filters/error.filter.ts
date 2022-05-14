import { WinstonLogger } from '@lib/decorators/winston-logger.decorator';
import { HTTPHelper } from '@lib/helpers/http.helper';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly loggerConsole = new Logger(ErrorFilter.name);

  constructor(@WinstonLogger() private readonly loggerFile) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: any = ctx.getResponse();

    if (exception instanceof HttpException) {
      const status: number = exception.getStatus();
      const exceptionHttp: Record<string, any> = exception;
      const exceptionData: Record<string, any> = exceptionHttp.response;

      this.loggerConsole.error(HTTPHelper.error(exception));
      this.loggerFile.error(exception);

      response.status(status).json({
        success: false,
        message: exceptionData.message,
        error: exceptionData.error,
        code: status,
      });
    } else {
      const status: number = HttpStatus.INTERNAL_SERVER_ERROR;
      const message = 'Sorry, There is a trouble in our server';
      const error = 'Internal Server Error';

      this.loggerConsole.error(HTTPHelper.error(exception));
      this.loggerFile.error(exception);

      response.status(status).json({
        success: false,
        message: message,
        error: error,
        code: status,
      });
    }
  }
}
