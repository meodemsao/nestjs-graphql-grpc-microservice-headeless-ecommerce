import { ID, Int, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'

@ObjectType('ProductCategory')
export class ProductCategoryDto extends BaseDto {

  @FilterableField(() => ID, { nullable: false, description: 'FK' })
  productId: string

  @FilterableField(() => ID, { nullable: false, description: 'FK' })
  categoryId: string

  @FilterableField(() => Int, { nullable: false, description: 'Thứ tự hiển thị' })
  sortOrder: number

}
