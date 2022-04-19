import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { AttributeOptionInputType } from '@vg/api-gateway/modules/attributeOption/dto/attributeOption.args'
import { AttributeOptionResolver } from '@vg/api-gateway/modules/attributeOption/attributeOption.resolver'
import { AttributeOptionDto } from '@vg/api-gateway/modules/attributeOption/dto/attributeOption.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: AttributeOptionDto,
          CreateDTOClass: AttributeOptionInputType,
          UpdateDTOClass: AttributeOptionInputType
        }
      ]
    })
  ],
  providers: [AttributeOptionResolver]
})
export class AttributeOptionModule {}
