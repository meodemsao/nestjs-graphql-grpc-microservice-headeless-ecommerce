import { ID, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@vg/query-graphql'
import { BaseDto } from '@vg/repository/dtos'
import { LocationStatus, LocationType } from '@vg/repository/enums'

@ObjectType('Location')
export class LocationDto extends BaseDto {
  @FilterableField(() => String, {
    nullable: false,
    description: 'Tên hiển thị'
  })
  name: string

  @FilterableField(() => String, {
    nullable: false,
    description: 'Khoá (Unique)'
  })
  code: string

  @FilterableField(() => ID, {
    nullable: true,
    description: 'ID Cha'
  })
  parentId?: string

  @FilterableField(() => Number, {
    nullable: false,
    description: 'Thứ tự hiển thị'
  })
  sortOrder: number

  @FilterableField(() => LocationStatus, {
    nullable: false,
    description: 'Active | Locked | Deleted'
  })
  status: LocationStatus

  @FilterableField(() => LocationType, {
    nullable: false,
    description: 'Area | Province | District | Ward'
  })
  type: LocationType
}
