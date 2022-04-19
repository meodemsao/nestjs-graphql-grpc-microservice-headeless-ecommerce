import { ID_FIELD_LENGTH } from '@vg/core'
import { LocationStatus, LocationType } from '@vg/repository/enums'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'

@Entity('location')
export class LocationEntity extends BaseEntity<any> {
  @Column('nvarchar', { name: 'name', nullable: false })
  name: string

  @Column('nvarchar', { name: 'code', nullable: false, unique: true })
  code: string

  @Column('int', { name: 'sortOrder', nullable: true })
  sortOrder: number

  @Column('char', {
    name: 'parentId',
    nullable: true,
    length: ID_FIELD_LENGTH
  })
  parentId?: string

  @Column('enum', {
    name: 'type',
    nullable: false,
    enum: LocationType
  })
  type: LocationType

  @Column('enum', {
    name: 'status',
    nullable: false,
    enum: LocationStatus
  })
  status: LocationStatus
}
