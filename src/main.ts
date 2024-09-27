import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS globally
  app.enableCors();

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Swagger API documentation setup
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API documentation for the application')
    .setVersion('1.0')
    .addBearerAuth() // Add authorization if needed (JWT, for example)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Swagger UI at /api/docs

  await app.listen(8000);
}

bootstrap();
