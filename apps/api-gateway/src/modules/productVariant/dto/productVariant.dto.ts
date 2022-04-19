import { Float, ID, Int, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import { FilterableField } from '@vg/query-graphql'
import { ProductVariantStatus } from '@vg/repository/enums'

@ObjectType('ProductVariant')
export class ProductVariantDto extends BaseDto {
  @FilterableField(() => ID, { nullable: false, description: 'FK - Product' })
  productId: string

  @FilterableField(() => String, { nullable: false, description: 'Tên' })
  name: string

  @FilterableField(() => String, {
    nullable: true,
    description: 'Mã lưu kho (Unique)'
  })
  sku?: string

  @FilterableField(() => String, {
    nullable: false,
    description: 'Mã nhà sản xuất'
  })
  manufacturerPartNumber: string

  @FilterableField(() => String, {
    nullable: false,
    description: 'Đường dẫn ảnh đại diện'
  })
  thubnailUrl: string

  @FilterableField(() => ProductVariantStatus, {
    nullable: false,
    defaultValue: ProductVariantStatus.Active,
    description: 'Active | Locked | Deleted'
  })
  status: ProductVariantStatus

  @FilterableField(() => Boolean, {
    nullable: false,
    description: 'Hiện thị giá',
    defaultValue: true
  })
  displayPrice: boolean

  @FilterableField(() => Boolean, {
    nullable: false,
    description: 'Cho phép vận chuyển',
    defaultValue: true
  })
  shipable: boolean

  @FilterableField(() => Float, {
    nullable: true,
    description: 'Cân nặng (kg)',
    defaultValue: 0
  })
  weight: number

  @FilterableField(() => Float, {
    nullable: true,
    description: 'Chiều dài (cm)',
    defaultValue: 0
  })
  length: number

  @FilterableField(() => Float, {
    nullable: true,
    description: 'Chiều rộng (cm)',
    defaultValue: 0
  })
  width: number

  @FilterableField(() => Float, {
    nullable: true,
    description: 'Chiều cao (cm)',
    defaultValue: 0
  })
  height: number

  @FilterableField(() => ID, {
    nullable: false,
    description: 'Danh mục tính thuế'
  })
  taxCategory: string

  @FilterableField(() => Float, {
    nullable: false,
    description: 'Phần trăm thuế (giá trị chỉ đọc)'
  })
  taxPercent: number

  @FilterableField(() => Float, {
    nullable: false,
    description: 'Giá chưa thuế',
    defaultValue: 0
  })
  priceExclTax: number

  @FilterableField(() => Float, {
    nullable: false,
    description: 'Giá cũ chưa thuế'
  })
  oldPriceExclTax: number

  @FilterableField(() => Float, {
    nullable: false,
    description: 'Giá đã bao gồm thuế',
    defaultValue: 0
  })
  priceInclTax: number

  @FilterableField(() => Float, {
    nullable: false,
    description: 'Giá cũ đã bao gồm thuế'
  })
  oldPriceInclTax: number

  @FilterableField(() => String, {
    nullable: false,
    description: 'Giá theo cửa hàng (JSON) - (ref: ProductVariantPrice)'
  })
  priceList: string

  @FilterableField(() => String, {
    nullable: false,
    description: 'Đơn vị tính mặc định'
  })
  unit: string

  @FilterableField(() => Int, {
    nullable: false,
    description: 'Tổng số lượng tồn kho'
  })
  stockAvailability: number

  @FilterableField(() => Boolean, {
    nullable: false,
    description: 'Kiểm tra tồn trước khi xuất kho',
    defaultValue: false
  })
  trackInventory: boolean

  @FilterableField(() => String, {
    nullable: false,
    description: 'Giá theo cửa hàng (JSON) - (ref: ProductVariantPrice)'
  })
  variantAttributes: string
}
