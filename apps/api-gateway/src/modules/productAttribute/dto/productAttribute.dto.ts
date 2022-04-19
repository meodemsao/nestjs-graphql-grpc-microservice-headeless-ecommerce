import { ID, Int, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'

@ObjectType('ProductAttribute')
export class ProductAttributeDto extends BaseDto {

  @FilterableField(() => ID, { nullable: false, description: 'FK' })
  productId: string

  @FilterableField(() => ID, { nullable: false, description: 'FK - Attribute' })
  attributeId: string

  @FilterableField(() => String, {
    nullable: true,
    description: 'Tên thuộc tính, cần trigger cập nhật lại khi update bảng Attribute'
  })
  attributeName: string

  @FilterableField(() => String, { nullable: true, description: 'FK - AttributeOption' })
  attributeOptionId: string

  @FilterableField(() => String, {
    nullable: false,
    description: 'Giá trị thuộc tính, cần trigger cập nhật lại khi update bảng AttributeOption'
  })
  attributeValue: string

  @FilterableField(() => Int, { nullable: false, description: 'Thứ tự hiển thị' })
  sortOrder: number

}
