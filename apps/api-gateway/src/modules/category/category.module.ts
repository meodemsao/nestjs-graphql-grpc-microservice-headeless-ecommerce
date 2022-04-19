import { Module } from '@nestjs/common'
import { CategoryResolver } from '@vg/api-gateway/modules/category/category.resolver'
import { CategoryTypeResolver } from '@vg/api-gateway/modules/category/category-type.resolver'
import { CategoryDto } from '@vg/api-gateway/modules/category/dto/category.dto'
import { CategoryInputType } from '@vg/api-gateway/modules/category/dto/category.args'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: CategoryDto,
            CreateDTOClass: CategoryInputType,
            UpdateDTOClass: CategoryInputType
          }
        ]
      }
    )
  ],
  providers: [
    CategoryTypeResolver,
    CategoryResolver
  ]
})
export class CategoryModule {
}
