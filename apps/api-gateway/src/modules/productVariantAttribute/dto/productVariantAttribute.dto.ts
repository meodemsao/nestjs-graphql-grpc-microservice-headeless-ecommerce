import { ID, Int, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import { FilterableField } from '@vg/query-graphql'

@ObjectType('ProductVariantAttribute')
export class ProductVariantAttributeDto extends BaseDto {
  @FilterableField(() => ID, { nullable: false, description: 'FK ' })
  productVariantId: string

  @FilterableField(() => ID, { nullable: false, description: 'FK - Attribute' })
  attributeId: string

  @FilterableField(() => String, {
    nullable: false,
    description:
      'Tên thuộc tính, cần trigger cập nhật lại khi update bảng Attribute'
  })
  attributeName: string

  @FilterableField(() => ID, {
    nullable: true,
    description: 'FK - AttributeOption'
  })
  attributeOptionId?: string

  @FilterableField(() => String, {
    nullable: false,
    description:
      'Giá trị thuộc tính, cần trigger cập nhật lại khi update bảng AttributeOption'
  })
  attributeValue: string

  @FilterableField(() => Int, {
    nullable: true,
    description: 'Thứ tự hiển thị'
  })
  sortOrder: number
}
