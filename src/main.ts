import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as process from 'process'

function setUpSwaggerDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('ToDo API')
    .setDescription('API to interact with ToDo application.')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth({
      description: 'Please enter token in following format: Bearer <JWT>',
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header'
    })
    .addSecurityRequirements('bearer')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  setUpSwaggerDocs(app)
  await app.listen(process.env.PORT || 3000)
}

bootstrap()
