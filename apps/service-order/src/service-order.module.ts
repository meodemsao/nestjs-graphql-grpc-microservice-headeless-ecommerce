import { Module } from '@nestjs/common';
import { ServiceOrderController } from './service-order.controller';
import { ServiceOrderService } from './service-order.service';

@Module({
  imports: [],
  controllers: [ServiceOrderController],
  providers: [ServiceOrderService],
})
export class ServiceOrderModule {}
