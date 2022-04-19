import { ID, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'

@ObjectType('ManufacturerStore')
export class ManufacturerStoreDto extends BaseDto {

  @FilterableField(() => ID, { nullable: false, description: 'FK - Manufacturer' })
  manufacturerId: string

  @FilterableField(() => ID, { nullable: false, description: 'FK - Store' })
  storeId: string

}
