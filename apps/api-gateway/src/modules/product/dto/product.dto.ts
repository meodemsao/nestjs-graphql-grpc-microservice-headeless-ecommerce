import { Field, Float, ID, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'
import { ProductStatus, ProductType } from '@vg/repository/enums'
import GraphQLJSON from 'graphql-type-json';

@ObjectType('Product')
export class ProductDto extends BaseDto {

  @FilterableField(() => String, { nullable: false, description: 'Tên' })
  name: string

  @Field(() => String, { nullable: false, description: 'Alias URL' })
  slug: string

  @Field(() => String, { nullable: true, description: 'Mô tả ngắn' })
  shortDescription: string

  @Field(() => String, { nullable: true, description: 'Mô tả dài' })
  longDescription: string

  @Field(() => String, { nullable: true, description: 'Đường dẫn ảnh đại diện' })
  thumbnailUrl: string

  @Field(() => ProductType, { nullable: false })
  productType: ProductType

  @Field(() => ID, { nullable: true, description: 'FK - Template' })
  productTemplateId: string

  @Field(() => ID, { nullable: true, description: 'FK - Manufacturer' })
  manufacturerId: string

  @Field(() => Number, { nullable: false, description: 'Thứ tự hiển thị' })
  sortOrder: number

  @Field(() => String, { nullable: true, description: 'SEO - Title' })
  metaTitle: string

  @Field(() => String, { nullable: true, description: 'SEO - Description' })
  metaDescription: string

  @Field(() => String, { nullable: true, description: 'SEO - Keywords' })
  metaKeywords: string

  @Field(() => String, { nullable: true, description: 'Từ khóa tìm kiếm (Chuỗi từ khóa cách nhau bằng dấu \',\')' })
  tags: string

  @Field(() => Boolean, { nullable: false, description: 'Cho phép thêm các thẻ meta tuỳ biến' })
  allowCustomMetaTag: boolean

  @Field(() => Boolean, { nullable: false, description: 'Chỉ hiển thị ở một số khu vực' })
  limitedToLocations: boolean

  @Field(() => Boolean, { nullable: false, description: 'Chỉ hiển thị ở một số cửa hàng' })
  limitedToStores: boolean

  @Field(() => ProductStatus, { nullable: true, description: 'Trạng thái' })
  status: ProductStatus

  @Field(() => Boolean, { nullable: false, description: 'Hiển thị giá' })
  displayPrice: boolean

  @Field(() => Boolean, {
    nullable: false,
    description: 'Cho phép vận chuyển'
  })
  shippable: boolean

  @Field(() => Float, { nullable: false, description: 'Cân nặng (kg)' })
  weight: number

  @Field(() => Float, { nullable: false, description: 'Chiều dài (cm)' })
  length: number

  @Field(() => Float, { nullable: false, description: 'Chiều rộng (cm)' })
  width: number

  @Field(() => Number, { nullable: false, description: 'Chiều cao (cm)' })
  height: number

  @Field(() => ID, { nullable: false, description: 'Danh mục tính thuế' })
  taxCategory: string

  @Field(() => Float, { nullable: false, description: 'Phần trăm thuế (giá trị chỉ đọc)' })
  taxPercent: number

  @Field(() => Float, { nullable: false, description: 'Giá chưa thuế' })
  priceExclTax: number

  @Field(() => Float, { nullable: false, description: 'Giá đã bao gồm thuế' })
  priceInclTax: number

  @Field(() => String, { nullable: true, description: 'Đơn vị tính mặc định' })
  unit: string

  @Field(() => Int, { nullable: true, description: 'Tổng số lượng tồn kho' })
  stockAvailability: number

  @Field(() => GraphQLJSON, {
    nullable: true,
    description: 'Thuộc tính sản phẩm (JSON) (ref - ProductAttribute / IsVariant = FALSE)'
  })
  attributes: any

  @Field(() => GraphQLJSON, {
    nullable: true,
    description: 'Các thuộc tính biến thể (JSON) (ref - ProductAttribute / IsVariant = TRUE)'
  })
  variantAttributes: any
}
