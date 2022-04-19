import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ProductLocationInputType } from '@vg/api-gateway/modules/productLocation/dto/productLocation.args'
import { ProductLocationResolver } from '@vg/api-gateway/modules/productLocation/productLocation.resolver'
import { ProductLocationDto } from '@vg/api-gateway/modules/productLocation/dto/productLocation.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: ProductLocationDto,
            CreateDTOClass: ProductLocationInputType,
            UpdateDTOClass: ProductLocationInputType
          }
        ]
      }
    )
  ],
  providers: [
    ProductLocationResolver
  ]
})
export class ProductLocationModule {
}
