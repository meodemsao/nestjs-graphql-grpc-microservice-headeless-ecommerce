import { registerEnumType } from '@nestjs/graphql'

export enum StoreType {
  RetailStore,
  Inventory
}

registerEnumType(StoreType, {
  name: 'StoreType'
})

export enum LocationType {
  Area,
  Province,
  District,
  Ward
}

registerEnumType(LocationType, {
  name: 'LocationType'
})

export enum LocationStatus {
  Active,
  Locked,
  Deleted
}

registerEnumType(LocationStatus, {
  name: 'LocationStatus'
})

export enum StoreStatus {
  Active,
  Locked,
  Deleted
}

registerEnumType(StoreStatus, {
  name: 'StoreStatus'
})
