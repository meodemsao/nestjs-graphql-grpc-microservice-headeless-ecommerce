import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { OrderController } from './order.controller'
import { OrderRepository } from '@vg/repository/repositories'

import { OrderService } from '@vg/service-cart/modules/order/order.service'
import { CommandHandlers } from '@vg/service-cart/modules/order/commands'
import { QueryHandlers } from '@vg/service-cart/modules/order/queries'

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository])],
  controllers: [OrderController],
  providers: [OrderService, ...CommandHandlers, ...QueryHandlers]
})
export class OrderModule {}
