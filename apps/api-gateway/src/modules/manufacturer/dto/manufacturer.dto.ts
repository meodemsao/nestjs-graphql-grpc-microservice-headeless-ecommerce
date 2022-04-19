import { Field, ID, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'
import { ManufacturerStatus } from '@vg/repository/enums'

@ObjectType('Manufacturer')
export class ManufacturerDto extends BaseDto {

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

  @Field(() => String, { nullable: true, description: 'Đường dẫn ảnh nền' })
  backgroundUrl: string

  @Field(() => ID, { nullable: true, description: 'Mẫu hiển thị' })
  templateId: string

  @Field(() => Number, { nullable: false, description: 'Thứ tự hiển thị' })
  sortOrder: number

  @Field(() => String, { nullable: true, description: 'SEO - Title' })
  metaTitle: string

  @Field(() => String, { nullable: true, description: 'SEO - Description' })
  metaDescription: string

  @Field(() => String, { nullable: true, description: 'SEO - Keywords' })
  metaKeywords: string

  @Field(() => Boolean, { nullable: false, description: 'Cho phép thêm các thẻ meta tuỳ biến' })
  allowCustomMetaTag: boolean

  @Field(() => Boolean, { nullable: false, description: 'Chỉ hiển thị ở một số khu vực' })
  limitedToLocations: boolean

  @Field(() => Boolean, { nullable: false, description: 'Chỉ hiển thị ở một số cửa hàng' })
  limitedToStores: boolean

  @Field(() => Number, { nullable: false, description: 'Số bản ghi hiện thị trên một trang' })
  pageSize: number

  @Field(() => [Number], {
    nullable: false,
    description: 'Danh sách các Option PageSize khách hàng được chọn (vd: 4,8,12)'
  })
  pageSizeOption: number[]

  @Field(() => Boolean, { nullable: false, description: 'Cho phép khách hàng được chọn pageSize' })
  allowCustomersToSelectPageSize: boolean

  @Field(() => Boolean, { nullable: false, description: 'Cho phép lọc theo khoảng giá' })
  priceRangeFiltering: boolean

  @Field(() => Boolean, { nullable: false, description: 'Cho phép khách hàng được nhập khoảng giá tuỳ chọn' })
  manuallyPriceRange: boolean

  @Field(() => Number, { nullable: false, description: 'Giá thấp nhất' })
  priceFrom: number

  @Field(() => Number, { nullable: false, description: 'Giá cao nhất' })
  priceTo: number

  @Field(() => ManufacturerStatus, { nullable: true, description: 'Trạng thái' })
  status: ManufacturerStatus
}
