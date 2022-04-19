import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { CollectionStoreInputType } from '@vg/api-gateway/modules/collectionStore/dto/collectionStore.args'
import { CollectionStoreResolver } from '@vg/api-gateway/modules/collectionStore/collectionStore.resolver'
import { CollectionStoreDto } from '@vg/api-gateway/modules/collectionStore/dto/collectionStore.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: CollectionStoreDto,
            CreateDTOClass: CollectionStoreInputType,
            UpdateDTOClass: CollectionStoreInputType
          }
        ]
      }
    )
  ],
  providers: [
    CollectionStoreResolver
  ]
})
export class CollectionStoreModule {
}
