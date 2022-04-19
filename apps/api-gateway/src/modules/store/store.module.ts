import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { StoreInputType } from '@vg/api-gateway/modules/store/dto/store.args'
import { StoreResolver } from '@vg/api-gateway/modules/store/store.resolver'
import { StoreDto } from '@vg/api-gateway/modules/store/dto/store.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: StoreDto,
          CreateDTOClass: StoreInputType,
          UpdateDTOClass: StoreInputType
        }
      ]
    })
  ],
  providers: [StoreResolver]
})
export class StoreModule {}
