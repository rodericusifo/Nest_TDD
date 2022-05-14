import { AppModule } from '@app/app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });
  const configService = app.get(ConfigService);
  const appPrefix = configService.get('APP_PREFIX');
  const logger = new Logger('Main');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.setGlobalPrefix(appPrefix);
  await app.listen(configService.get('HTTP_PORT') || 3000, () => {
    logger.log(
      `Server running on http://${configService.get(
        'HTTP_HOST',
      )}:${configService.get('HTTP_PORT')}`,
      'NestApplication',
    );
  });
}
bootstrap();
