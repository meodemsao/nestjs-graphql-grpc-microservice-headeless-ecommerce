import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { DiscountInputType } from '@vg/api-gateway/modules/discount/dto/discount.args'
import { DiscountResolver } from '@vg/api-gateway/modules/discount/discount.resolver'
import { DiscountDto } from '@vg/api-gateway/modules/discount/dto/discount.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: DiscountDto,
          CreateDTOClass: DiscountInputType,
          UpdateDTOClass: DiscountInputType
        }
      ]
    })
  ],
  providers: [DiscountResolver]
})
export class DiscountModule {}
