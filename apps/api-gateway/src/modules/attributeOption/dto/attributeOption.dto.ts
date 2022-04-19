import { ID, Int, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import { FilterableField } from '@vg/query-graphql'

@ObjectType('AttributeOption')
export class AttributeOptionDto extends BaseDto {
  @FilterableField(() => ID, { nullable: false, description: 'FK - Attribute' })
  attributeId: string

  @FilterableField(() => String, { nullable: false })
  value: string

  @FilterableField(() => Int, { nullable: true })
  sortOrder: number
}
