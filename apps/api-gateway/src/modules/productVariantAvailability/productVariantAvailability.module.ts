import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ProductVariantAvailabilityInputType } from '@vg/api-gateway/modules/productVariantAvailability/dto/productVariantAvailability.args'
import { ProductVariantAvailabilityResolver } from '@vg/api-gateway/modules/productVariantAvailability/productVariantAvailability.resolver'
import { ProductVariantAvailabilityDto } from '@vg/api-gateway/modules/productVariantAvailability/dto/productVariantAvailability.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: ProductVariantAvailabilityDto,
          CreateDTOClass: ProductVariantAvailabilityInputType,
          UpdateDTOClass: ProductVariantAvailabilityInputType
        }
      ]
    })
  ],
  providers: [ProductVariantAvailabilityResolver]
})
export class ProductVariantAvailabilityModule {}
