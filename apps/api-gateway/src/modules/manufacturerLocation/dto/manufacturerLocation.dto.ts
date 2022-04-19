import { ID, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'

@ObjectType('ManufacturerLocation')
export class ManufacturerLocationDto extends BaseDto {

  @FilterableField(() => ID, { nullable: true, description: 'FK - Manufacturer' })
  manufacturerId: string

  @FilterableField(() => ID, { nullable: true, description: 'FK - Location' })
  locationId: string

}
