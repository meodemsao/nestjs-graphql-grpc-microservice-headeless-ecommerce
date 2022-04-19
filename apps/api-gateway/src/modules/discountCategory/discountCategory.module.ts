import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { DiscountCategoryInputType } from '@vg/api-gateway/modules/discountCategory/dto/discountCategory.args'
import { DiscountCategoryResolver } from '@vg/api-gateway/modules/discountCategory/discountCategory.resolver'
import { DiscountCategoryDto } from '@vg/api-gateway/modules/discountCategory/dto/discountCategory.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: DiscountCategoryDto,
          CreateDTOClass: DiscountCategoryInputType,
          UpdateDTOClass: DiscountCategoryInputType
        }
      ]
    })
  ],
  providers: [DiscountCategoryResolver]
})
export class DiscountCategoryModule {}
