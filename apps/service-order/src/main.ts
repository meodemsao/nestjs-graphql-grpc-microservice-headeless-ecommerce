import { NestFactory } from '@nestjs/core';
import { ServiceOrderModule } from './service-order.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceOrderModule);
  await app.listen(3000);
}
bootstrap();
