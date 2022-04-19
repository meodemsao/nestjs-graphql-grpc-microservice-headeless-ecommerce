import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { AttributeInputType } from '@vg/api-gateway/modules/attribute/dto/attribute.args'
import { AttributeResolver } from '@vg/api-gateway/modules/attribute/attribute.resolver'
import { AttributeDto } from '@vg/api-gateway/modules/attribute/dto/attribute.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: AttributeDto,
          CreateDTOClass: AttributeInputType,
          UpdateDTOClass: AttributeInputType
        }
      ]
    })
  ],
  providers: [AttributeResolver]
})
export class AttributeModule {}
