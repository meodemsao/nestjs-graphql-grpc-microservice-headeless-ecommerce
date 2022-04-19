import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { OrderInputType } from '@vg/api-gateway/modules/order/dto/order.args'
import { OrderResolver } from '@vg/api-gateway/modules/order/order.resolver'
import { OrderDto } from '@vg/api-gateway/modules/order/dto/order.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: OrderDto,
          CreateDTOClass: OrderInputType,
          UpdateDTOClass: OrderInputType
        }
      ]
    })
  ],
  providers: [OrderResolver]
})
export class OrderModule {}
