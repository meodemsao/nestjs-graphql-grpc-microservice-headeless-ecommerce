import { registerEnumType } from '@nestjs/graphql'

export enum CategoryStatus {
  Active,
  Locked,
  Deleted
}

registerEnumType(CategoryStatus, {
  name: 'CategoryStatus'
})

export enum CollectionStatus {
  Active,
  Locked,
  Deleted
}

registerEnumType(CollectionStatus, {
  name: 'CollectionStatus'
})

export enum ManufacturerStatus {
  Active,
  Locked,
  Deleted
}

registerEnumType(ManufacturerStatus, {
  name: 'ManufacturerStatus'
})

export enum ProductType {
  Simple,
  Variant
}

registerEnumType(ProductType, {
  name: 'ProductType'
})

export enum ProductStatus {
  Active,
  Locked,
  Deleted
}

registerEnumType(ProductStatus, {
  name: 'ProductStatus'
})

export enum AttributeValueType {
  String,
  Number,
  Option
}

registerEnumType(AttributeValueType, { name: 'AttributeValueType' })

export enum AttributeStatus {
  Active,
  Locked,
  Deleted
}

registerEnumType(AttributeStatus, { name: 'AttributeStatus' })

export enum ImportPriceHistoryPriority {
  High,
  Medium,
  Low
}

registerEnumType(ImportPriceHistoryPriority, {
  name: 'ImportPriceHistoryPriority'
})

export enum ProductVariantPricePriority {
  High,
  Medium,
  Low
}

registerEnumType(ProductVariantPricePriority, {
  name: 'ProductVariantPricePriority'
})

export enum ProductVariantPriceScope {
  Order,
  SyncData
}

registerEnumType(ProductVariantPriceScope, {
  name: 'ProductVariantPriceScope'
})

export enum ProductVariantUsageHistoryScope {
  Order,
  SyncData
}

registerEnumType(ProductVariantUsageHistoryScope, {
  name: 'ProductVariantUsageHistoryScope'
})

export enum ProductVariantStatus {
  Active,
  Locked,
  Deleted
}

registerEnumType(ProductVariantStatus, {
  name: 'ProductVariantStatus'
})

export enum MetaTagReferenceType {
  Category,
  Collection,
  Manufacturer,
  Product
}
export enum TemplateType {
  Category,
  Collection,
  Manufacturer,
  Product
}

registerEnumType(MetaTagReferenceType, {
  name: 'MetaTagReferenceType'
})
registerEnumType(TemplateType, {
  name: 'TemplateType'
})

export enum MetaTagStatus {
  Active,
  Locked,
  Deleted
}

export enum TagStatus {
  Active,
  Locked,
  Deleted
}

registerEnumType(MetaTagStatus, {
  name: 'MetaTagStatus'
})

registerEnumType(TagStatus, {
  name: 'TagStatus'
})
