import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'
import { CollectionDto } from '@vg/api-gateway/modules/collection/dto/collection.dto'
import { CollectionInputType } from '@vg/api-gateway/modules/collection/dto/collection.args'
import { CollectionResolver } from '@vg/api-gateway/modules/collection/collection.resolver'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: CollectionDto,
            CreateDTOClass: CollectionInputType,
            UpdateDTOClass: CollectionInputType
          }
        ]
      }
    )
  ],
  providers: [
    CollectionResolver
  ]
})
export class CollectionModule {
}
