import { registerEnumType } from '@nestjs/graphql'

export enum OrderStatus {
  Draf,
  WaitForConfirmation,
  ReadyForDelivery,
  Delivery,
  Delivered,
  Canceled
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus'
})

export enum PaymentStatus {
  Pending,
  Paid,
  UnPaid
}

registerEnumType(PaymentStatus, {
  name: 'PaymentStatus'
})

export enum ShippingStatus {
  Delivering
}

registerEnumType(ShippingStatus, {
  name: 'ShippingStatus'
})

export enum DiscountType {
  All,
  Category,
  Product,
  Manufacturer
}

registerEnumType(DiscountType, {
  name: 'DiscountType'
})

export enum DiscountLimitation {
  Unlimited,
  NTimes,
  NTimesPerUser
}

registerEnumType(DiscountLimitation, {
  name: 'DiscountLimitation'
})

export enum DiscountPriority {
  Low,
  Medium,
  High
}

registerEnumType(DiscountPriority, {
  name: 'DiscountPriority'
})

export enum DiscountStatus {
  Active,
  Locked,
  Deleted
}

registerEnumType(DiscountStatus, {
  name: 'DiscountStatus'
})

export enum DiscountRequirementType {
  TotalPriceAbove,
  RequireProducts
}

registerEnumType(DiscountRequirementType, {
  name: 'DiscountRequirementType'
})

export enum DiscountRequirementStatus {
  Active,
  Locked,
  Deleted
}

registerEnumType(DiscountRequirementStatus, {
  name: 'DiscountRequirementStatus'
})

export enum ConfigSettingStatus {
  Active,
  Deleted
}

registerEnumType(ConfigSettingStatus, {
  name: 'ConfigSettingStatus'
})
