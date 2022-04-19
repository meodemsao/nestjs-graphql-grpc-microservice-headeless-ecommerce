import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ProductCategoryInputType } from '@vg/api-gateway/modules/productCategory/dto/productCategory.args'
import { ProductCategoryResolver } from '@vg/api-gateway/modules/productCategory/productCategory.resolver'
import { ProductCategoryDto } from '@vg/api-gateway/modules/productCategory/dto/productCategory.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: ProductCategoryDto,
            CreateDTOClass: ProductCategoryInputType,
            UpdateDTOClass: ProductCategoryInputType
          }
        ]
      }
    )
  ],
  providers: [
    ProductCategoryResolver
  ]
})
export class ProductCategoryModule {
}
