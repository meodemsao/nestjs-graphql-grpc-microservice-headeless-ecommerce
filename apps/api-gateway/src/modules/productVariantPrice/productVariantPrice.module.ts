import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ProductVariantPriceInputType } from '@vg/api-gateway/modules/productVariantPrice/dto/productVariantPrice.args'
import { ProductVariantPriceResolver } from '@vg/api-gateway/modules/productVariantPrice/productVariantPrice.resolver'
import { ProductVariantPriceDto } from '@vg/api-gateway/modules/productVariantPrice/dto/productVariantPrice.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: ProductVariantPriceDto,
          CreateDTOClass: ProductVariantPriceInputType,
          UpdateDTOClass: ProductVariantPriceInputType
        }
      ]
    })
  ],
  providers: [ProductVariantPriceResolver]
})
export class ProductVariantPriceModule {}
