import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { ManufacturerStoreInputType } from '@vg/api-gateway/modules/manufacturerStore/dto/manufacturerStore.args'
import { ManufacturerStoreResolver } from '@vg/api-gateway/modules/manufacturerStore/manufacturerStore.resolver'
import { ManufacturerStoreDto } from '@vg/api-gateway/modules/manufacturerStore/dto/manufacturerStore.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: ManufacturerStoreDto,
            CreateDTOClass: ManufacturerStoreInputType,
            UpdateDTOClass: ManufacturerStoreInputType
          }
        ]
      }
    )
  ],
  providers: [
    ManufacturerStoreResolver
  ]
})
export class ManufacturerStoreModule {
}
