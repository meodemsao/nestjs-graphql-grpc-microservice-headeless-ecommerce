import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'
import { CategoryStoreDto } from '@vg/api-gateway/modules/categoryStore/dto/categoryStore.dto'
import { CategoryStoreInputType } from '@vg/api-gateway/modules/categoryStore/dto/categoryStore.args'
import { CategoryStoreResolver } from '@vg/api-gateway/modules/categoryStore/categoryStore.resolver'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: CategoryStoreDto,
            CreateDTOClass: CategoryStoreInputType,
            UpdateDTOClass: CategoryStoreInputType
          }
        ]
      }
    )
  ],
  providers: [
    CategoryStoreResolver
  ]
})
export class CategoryStoreModule {
}
