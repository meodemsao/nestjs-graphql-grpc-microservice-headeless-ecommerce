import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'

import { ID_FIELD_LENGTH } from '@vg/core'
import { StoreStatus, StoreType } from '@vg/repository/enums'

@Entity('store')
export class StoreEntity extends BaseEntity<any> {
  @Column('nvarchar', { name: 'name', nullable: false })
  name: string

  @Column('nvarchar', { name: 'code', nullable: false, unique: true })
  code: string

  @Column('nvarchar', { name: 'description', nullable: true })
  description?: string

  @Column('char', {
    name: 'manageBy',
    nullable: true,
    length: ID_FIELD_LENGTH
  })
  manageBy?: string

  @Column('char', {
    name: 'areaId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  areaId: string

  @Column('char', {
    name: 'provinceId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  provinceId: string

  @Column('char', {
    name: 'districtId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  districtId: string

  @Column('char', {
    name: 'wardId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  wardId: string

  @Column('nvarchar', { name: 'address', nullable: false })
  address: string

  @Column('nvarchar', { name: 'manager', nullable: true })
  manager?: string

  @Column('nvarchar', { name: 'phoneNumber', nullable: true })
  phoneNumber?: string

  @Column('nvarchar', { name: 'hotline', nullable: true })
  hotline?: string

  @Column('enum', {
    name: 'type',
    nullable: false,
    enum: StoreType
  })
  type: StoreType

  @Column('enum', {
    name: 'status',
    nullable: false,
    enum: StoreStatus
  })
  status: StoreStatus
}
