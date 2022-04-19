import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { DiscountProductInputType } from '@vg/api-gateway/modules/discountProduct/dto/discountProduct.args'
import { DiscountProductResolver } from '@vg/api-gateway/modules/discountProduct/discountProduct.resolver'
import { DiscountProductDto } from '@vg/api-gateway/modules/discountProduct/dto/discountProduct.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: DiscountProductDto,
          CreateDTOClass: DiscountProductInputType,
          UpdateDTOClass: DiscountProductInputType
        }
      ]
    })
  ],
  providers: [DiscountProductResolver]
})
export class DiscountProductModule {}
