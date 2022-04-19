import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'
import { CategoryLocationDto } from '@vg/api-gateway/modules/categoryLocation/dto/categoryLocation.dto'
import { CategoryLocationInputType } from '@vg/api-gateway/modules/categoryLocation/dto/categoryLocation.args'
import { CategoryLocationResolver } from '@vg/api-gateway/modules/categoryLocation/categoryLocation.resolver'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: CategoryLocationDto,
            CreateDTOClass: CategoryLocationInputType,
            UpdateDTOClass: CategoryLocationInputType
          }
        ]
      }
    )
  ],
  providers: [
    CategoryLocationResolver
  ]
})
export class CategoryLocationModule {
}
