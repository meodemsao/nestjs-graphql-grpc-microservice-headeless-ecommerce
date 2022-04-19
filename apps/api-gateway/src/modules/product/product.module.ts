import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'
import { ProductDto } from '@vg/api-gateway/modules/product/dto/product.dto'
import { ProductInputType } from '@vg/api-gateway/modules/product/dto/product.args'
import { ProductResolver } from '@vg/api-gateway/modules/product/product.resolver'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: ProductDto,
            CreateDTOClass: ProductInputType,
            UpdateDTOClass: ProductInputType
          }
        ]
      }
    )
  ],
  providers: [
    ProductResolver
  ]
})
export class ProductModule {
}
