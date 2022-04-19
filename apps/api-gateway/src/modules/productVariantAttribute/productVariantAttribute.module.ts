import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ProductVariantAttributeInputType } from '@vg/api-gateway/modules/productVariantAttribute/dto/productVariantAttribute.args'
import { ProductVariantAttributeResolver } from '@vg/api-gateway/modules/productVariantAttribute/productVariantAttribute.resolver'
import { ProductVariantAttributeDto } from '@vg/api-gateway/modules/productVariantAttribute/dto/productVariantAttribute.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: ProductVariantAttributeDto,
          CreateDTOClass: ProductVariantAttributeInputType,
          UpdateDTOClass: ProductVariantAttributeInputType
        }
      ]
    })
  ],
  providers: [ProductVariantAttributeResolver]
})
export class ProductVariantAttributeModule {}
