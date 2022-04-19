import { ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@vg/query-graphql'
import { BaseDto } from '@vg/repository/dtos'
import { AttributeStatus, AttributeValueType } from '@vg/repository/enums'

@ObjectType('Attribute')
export class AttributeDto extends BaseDto {
  @FilterableField(() => String, {
    nullable: false,
    description: 'Tên thuộc tính'
  })
  name: string

  @FilterableField(() => String, {
    nullable: false,
    description: 'Mã thuộc tính (Unique)'
  })
  code: string

  @FilterableField(() => String, { nullable: true, description: 'Mô tả' })
  description: string

  @FilterableField(() => Boolean, {
    nullable: false,
    description: 'TRUE => ValueType phải là Option'
  })
  isVariant: boolean

  @FilterableField(() => AttributeValueType, {
    nullable: false,
    description: 'String | Number | Option'
  })
  valueType: AttributeValueType

  @FilterableField(() => AttributeStatus, {
    nullable: false,
    description: 'Active | Locked | Deleted'
  })
  status: AttributeStatus
}
