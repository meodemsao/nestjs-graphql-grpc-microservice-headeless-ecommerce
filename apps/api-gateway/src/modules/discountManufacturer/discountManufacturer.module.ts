import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'

import { DiscountManufacturerInputType } from '@vg/api-gateway/modules/discountManufacturer/dto/discountManufacturer.args'
import { DiscountManufacturerResolver } from '@vg/api-gateway/modules/discountManufacturer/discountManufacturer.resolver'
import { DiscountManufacturerDto } from '@vg/api-gateway/modules/discountManufacturer/dto/discountManufacturer.dto'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      resolvers: [
        {
          DTOClass: DiscountManufacturerDto,
          CreateDTOClass: DiscountManufacturerInputType,
          UpdateDTOClass: DiscountManufacturerInputType
        }
      ]
    })
  ],
  providers: [DiscountManufacturerResolver]
})
export class DiscountManufacturerModule {}
