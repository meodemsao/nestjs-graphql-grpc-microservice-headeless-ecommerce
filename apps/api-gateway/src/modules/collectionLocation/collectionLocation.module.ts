import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'
import { CollectionLocationDto } from '@vg/api-gateway/modules/collectionLocation/dto/collectionLocation.dto'
import { CollectionLocationInputType } from '@vg/api-gateway/modules/collectionLocation/dto/collectionLocation.args'
import { CollectionLocationResolver } from '@vg/api-gateway/modules/collectionLocation/collectionLocation.resolver'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: CollectionLocationDto,
            CreateDTOClass: CollectionLocationInputType,
            UpdateDTOClass: CollectionLocationInputType
          }
        ]
      }
    )
  ],
  providers: [
    CollectionLocationResolver
  ]
})
export class CollectionLocationModule {
}
