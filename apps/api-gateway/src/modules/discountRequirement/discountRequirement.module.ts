import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { DiscountRequirementInputType } from '@vg/api-gateway/modules/discountRequirement/dto/discountRequirement.args'
import { DiscountRequirementResolver } from '@vg/api-gateway/modules/discountRequirement/discountRequirement.resolver'
import { DiscountRequirementDto } from '@vg/api-gateway/modules/discountRequirement/dto/discountRequirement.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: DiscountRequirementDto,
          CreateDTOClass: DiscountRequirementInputType,
          UpdateDTOClass: DiscountRequirementInputType
        }
      ]
    })
  ],
  providers: [DiscountRequirementResolver]
})
export class DiscountRequirementModule {}
