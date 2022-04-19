import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ProductAttributeInputType } from '@vg/api-gateway/modules/productAttribute/dto/productAttribute.args'
import { ProductAttributeResolver } from '@vg/api-gateway/modules/productAttribute/productAttribute.resolver'
import { ProductAttributeDto } from '@vg/api-gateway/modules/productAttribute/dto/productAttribute.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: ProductAttributeDto,
            CreateDTOClass: ProductAttributeInputType,
            UpdateDTOClass: ProductAttributeInputType
          }
        ]
      }
    )
  ],
  providers: [
    ProductAttributeResolver
  ]
})
export class ProductAttributeModule {
}
