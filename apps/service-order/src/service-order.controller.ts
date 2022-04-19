import { Controller, Get } from '@nestjs/common';
import { ServiceOrderService } from './service-order.service';

@Controller()
export class ServiceOrderController {
  constructor(private readonly serviceOrderService: ServiceOrderService) {}

  @Get()
  getHello(): string {
    return this.serviceOrderService.getHello();
  }
}
