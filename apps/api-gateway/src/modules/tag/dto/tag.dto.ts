import { Int, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'
import { TagStatus } from '@vg/repository/enums'

@ObjectType('Tag')
export class TagDto extends BaseDto {

  @FilterableField(() => String, { nullable: false, description: 'Tên hiển thị' })
  name: string

  @FilterableField(() => TagStatus, { nullable: false })
  status: TagStatus

}
