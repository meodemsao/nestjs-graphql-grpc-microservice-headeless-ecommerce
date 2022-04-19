import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ProductCollectionInputType } from '@vg/api-gateway/modules/productCollection/dto/productCollection.args'
import { ProductCollectionResolver } from '@vg/api-gateway/modules/productCollection/productCollection.resolver'
import { ProductCollectionDto } from '@vg/api-gateway/modules/productCollection/dto/productCollection.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: ProductCollectionDto,
            CreateDTOClass: ProductCollectionInputType,
            UpdateDTOClass: ProductCollectionInputType
          }
        ]
      }
    )
  ],
  providers: [
    ProductCollectionResolver
  ]
})
export class ProductCollectionModule {
}
