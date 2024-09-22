import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap () {

  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: "*", // ou 'http://localhost:3001'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  };


  const config = new DocumentBuilder()
    .setTitle('Consulta CA API')
    .setVersion('1.0')
    .addTag('consulta ca')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: "*", // ou 'http://localhost:3001'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // app.use(cors(corsOptions));
  await app.listen(3000);
}
bootstrap();
