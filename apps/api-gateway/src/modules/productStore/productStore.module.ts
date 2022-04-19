import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ProductStoreInputType } from '@vg/api-gateway/modules/productStore/dto/productStore.args'
import { ProductStoreResolver } from '@vg/api-gateway/modules/productStore/productStore.resolver'
import { ProductStoreDto } from '@vg/api-gateway/modules/productStore/dto/productStore.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: ProductStoreDto,
            CreateDTOClass: ProductStoreInputType,
            UpdateDTOClass: ProductStoreInputType
          }
        ]
      }
    )
  ],
  providers: [
    ProductStoreResolver
  ]
})
export class ProductStoreModule {
}
