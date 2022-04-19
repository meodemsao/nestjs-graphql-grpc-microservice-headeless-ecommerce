import { NestFactory } from '@nestjs/core'
import { microserviceSetup, SERVICE_LIST, tracer } from '@vg/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  tracer('service-config')

  await microserviceSetup(app, SERVICE_LIST.config.protoPath, {
    enableNats: false,
    enableMqtt: false
  })
}

(async () => await bootstrap())()
