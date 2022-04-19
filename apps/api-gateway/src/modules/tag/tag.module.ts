import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { TagInputType } from '@vg/api-gateway/modules/tag/dto/tag.args'
import { TagResolver } from '@vg/api-gateway/modules/tag/tag.resolver'
import { TagDto } from '@vg/api-gateway/modules/tag/dto/tag.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: TagDto,
            CreateDTOClass: TagInputType,
            UpdateDTOClass: TagInputType
          }
        ]
      }
    )
  ],
  providers: [
    TagResolver
  ]
})
export class TagModule {
}
