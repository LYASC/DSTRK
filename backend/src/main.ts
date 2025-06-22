import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173', // Front
      //'https://www.dstrk.fr'          // Domaine de production
    ],
    credentials: true, // autorise envoi de cookies 'en-têtes d'authentification
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
