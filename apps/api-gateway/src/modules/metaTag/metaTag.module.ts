import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { MetaTagInputType } from '@vg/api-gateway/modules/metaTag/dto/metaTag.args'
import { MetaTagResolver } from '@vg/api-gateway/modules/metaTag/metaTag.resolver'
import { MetaTagDto } from '@vg/api-gateway/modules/metaTag/dto/metaTag.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: MetaTagDto,
          CreateDTOClass: MetaTagInputType,
          UpdateDTOClass: MetaTagInputType
        }
      ]
    })
  ],
  providers: [MetaTagResolver]
})
export class MetaTagModule {}
