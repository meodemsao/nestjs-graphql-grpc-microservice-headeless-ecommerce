import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ProductVariantInputType } from '@vg/api-gateway/modules/productVariant/dto/productVariant.args'
import { ProductVariantResolver } from '@vg/api-gateway/modules/productVariant/productVariant.resolver'
import { ProductVariantDto } from '@vg/api-gateway/modules/productVariant/dto/productVariant.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: ProductVariantDto,
          CreateDTOClass: ProductVariantInputType,
          UpdateDTOClass: ProductVariantInputType
        }
      ]
    })
  ],
  providers: [ProductVariantResolver]
})
export class ProductVariantModule {}
