import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'
import { ManufacturerLocationDto } from '@vg/api-gateway/modules/manufacturerLocation/dto/manufacturerLocation.dto'
import { ManufacturerLocationInputType } from '@vg/api-gateway/modules/manufacturerLocation/dto/manufacturerLocation.args'
import { ManufacturerLocationResolver } from '@vg/api-gateway/modules/manufacturerLocation/manufacturerLocation.resolver'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: ManufacturerLocationDto,
            CreateDTOClass: ManufacturerLocationInputType,
            UpdateDTOClass: ManufacturerLocationInputType
          }
        ]
      }
    )
  ],
  providers: [
    ManufacturerLocationResolver
  ]
})
export class ManufacturerLocationModule {
}
