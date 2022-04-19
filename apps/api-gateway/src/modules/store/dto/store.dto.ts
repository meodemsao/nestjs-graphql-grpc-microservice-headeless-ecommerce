import { ID, ObjectType } from '@nestjs/graphql'
import { FilterableField } from '@vg/query-graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  StoreStatus,
  PaymentStatus,
  ShippingStatus,
  StoreType
} from '@vg/repository/enums'

@ObjectType('Store')
export class StoreDto extends BaseDto {
  @FilterableField(() => String, {
    nullable: false,
    description: 'Tên'
  })
  name: string

  @FilterableField(() => String, {
    nullable: false,
    description: 'Mã cửa hàng (Unique)'
  })
  code: string

  @FilterableField(() => String, {
    nullable: true,
    description: 'Mô tả'
  })
  description?: string

  @FilterableField(() => ID, {
    nullable: true,
    description: 'FK - Store'
  })
  manageBy?: string

  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - Location (Khu vực)'
  })
  areaId: string

  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - Location (Tỉnh)'
  })
  provinceId: string

  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - Location (Quận / Huyện)'
  })
  districtId: string

  @FilterableField(() => ID, {
    nullable: false,
    description: 'FK - Location (Phường / Xã)'
  })
  wardId: string

  @FilterableField(() => String, {
    nullable: false,
    description: 'Địa chỉ'
  })
  address: string

  @FilterableField(() => String, {
    nullable: true,
    description: 'Tên người quản lý'
  })
  manager?: string

  @FilterableField(() => String, {
    nullable: true,
    description: 'Điện thoại liên hệ'
  })
  phoneNumber?: string

  @FilterableField(() => Number, {
    nullable: true,
    description: 'Số hotline'
  })
  hotline: string

  @FilterableField(() => StoreType, {
    nullable: false,
    description: 'RetailStore | Invetory'
  })
  type: StoreType

  @FilterableField(() => StoreStatus, {
    nullable: false,
    description: 'Active | Locked | Deleted'
  })
  status: StoreStatus
}
