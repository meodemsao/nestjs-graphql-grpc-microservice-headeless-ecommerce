import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { LocationInputType } from '@vg/api-gateway/modules/location/dto/location.args'
import { LocationResolver } from '@vg/api-gateway/modules/location/location.resolver'
import { LocationDto } from '@vg/api-gateway/modules/location/dto/location.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: LocationDto,
          CreateDTOClass: LocationInputType,
          UpdateDTOClass: LocationInputType
        }
      ]
    })
  ],
  providers: [LocationResolver]
})
export class LocationModule {}
