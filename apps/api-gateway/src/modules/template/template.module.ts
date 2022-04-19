import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { TemplateInputType } from '@vg/api-gateway/modules/template/dto/template.args'
import { TemplateResolver } from '@vg/api-gateway/modules/template/template.resolver'
import { TemplateDto } from '@vg/api-gateway/modules/template/dto/template.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: TemplateDto,
            CreateDTOClass: TemplateInputType,
            UpdateDTOClass: TemplateInputType
          }
        ]
      }
    )
  ],
  providers: [
    TemplateResolver
  ]
})
export class TemplateModule {
}
