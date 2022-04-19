import { ID, Int, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import { FilterableField } from '@vg/query-graphql'
import { MetaTagReferenceType, MetaTagStatus } from '@vg/repository/enums'

@ObjectType('MetaTag')
export class MetaTagDto extends BaseDto {
  @FilterableField(() => String, {
    nullable: false,
    description: 'Tên hiển thị'
  })
  name: string

  @FilterableField(() => String, { nullable: false, description: 'Giá trị' })
  value: string

  @FilterableField(() => Int, {
    nullable: false,
    description: 'Thứ tự hiển thị'
  })
  sortOrder: number

  @FilterableField(() => ID, { nullable: false, description: 'ID tham chiếu' })
  referenceId: string

  @FilterableField(() => MetaTagReferenceType, {
    nullable: false,
    description: 'Category | Collection | Manufacturer | Product'
  })
  referenceType: MetaTagReferenceType

  @FilterableField(() => MetaTagStatus, {
    nullable: false,
    description: 'Active | Locked | Deleted'
  })
  status: MetaTagStatus
}
