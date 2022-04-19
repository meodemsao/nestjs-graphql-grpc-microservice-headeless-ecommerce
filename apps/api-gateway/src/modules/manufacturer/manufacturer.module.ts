import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'
import { ManufacturerDto } from '@vg/api-gateway/modules/manufacturer/dto/manufacturer.dto'
import { ManufacturerInputType } from '@vg/api-gateway/modules/manufacturer/dto/manufacturer.args'
import { ManufacturerResolver } from '@vg/api-gateway/modules/manufacturer/manufacturer.resolver'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: ManufacturerDto,
            CreateDTOClass: ManufacturerInputType,
            UpdateDTOClass: ManufacturerInputType
          }
        ]
      }
    )
  ],
  providers: [
    ManufacturerResolver
  ]
})
export class ManufacturerModule {
}
