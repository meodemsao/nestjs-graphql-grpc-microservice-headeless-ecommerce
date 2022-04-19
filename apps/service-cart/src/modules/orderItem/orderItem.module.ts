import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { OrderItemController } from './orderItem.controller'
import { OrderItemRepository } from '@vg/repository/repositories'

import { OrderItemService } from '@vg/service-cart/modules/orderItem/orderItem.service'
import { CommandHandlers } from '@vg/service-cart/modules/orderItem/commands'
import { QueryHandlers } from '@vg/service-cart/modules/orderItem/queries'

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemRepository])],
  controllers: [OrderItemController],
  providers: [OrderItemService, ...CommandHandlers, ...QueryHandlers]
})
export class OrderItemModule {}
