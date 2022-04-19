import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { OrderItemInputType } from '@vg/api-gateway/modules/orderItem/dto/orderItem.args'
import { OrderItemResolver } from '@vg/api-gateway/modules/orderItem/orderItem.resolver'
import { OrderItemDto } from '@vg/api-gateway/modules/orderItem/dto/orderItem.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: OrderItemDto,
          CreateDTOClass: OrderItemInputType,
          UpdateDTOClass: OrderItemInputType
        }
      ]
    })
  ],
  providers: [OrderItemResolver]
})
export class OrderItemModule {}
