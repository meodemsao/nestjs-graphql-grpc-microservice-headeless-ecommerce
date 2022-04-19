import { ID, Int, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'

@ObjectType('ProductImage')
export class ProductImageDto extends BaseDto {

  @FilterableField(() => ID, { nullable: false, description: 'FK' })
  productId: string

  @FilterableField(() => String, { nullable: false, description: 'Đường dẫn ảnh' })
  imageUrl: string

  @FilterableField(() => Int, { nullable: false, description: 'Thứ tự hiển thị' })
  sortOrder: number

}
