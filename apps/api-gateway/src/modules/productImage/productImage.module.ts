import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ProductImageInputType } from '@vg/api-gateway/modules/productImage/dto/productImage.args'
import { ProductImageResolver } from '@vg/api-gateway/modules/productImage/productImage.resolver'
import { ProductImageDto } from '@vg/api-gateway/modules/productImage/dto/productImage.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: ProductImageDto,
            CreateDTOClass: ProductImageInputType,
            UpdateDTOClass: ProductImageInputType
          }
        ]
      }
    )
  ],
  providers: [
    ProductImageResolver
  ]
})
export class ProductImageModule {
}
