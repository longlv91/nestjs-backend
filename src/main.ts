import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('NestJS Demo Backend API')
    .setDescription('The NestJS Demo Backend API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addTag('Backend API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apidocs', app, document);

  await app.listen(3333);
}
bootstrap();
