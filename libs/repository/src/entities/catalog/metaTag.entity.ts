import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'
import { MetaTagReferenceType, MetaTagStatus } from '@vg/repository/enums'

@Entity('metaTag')
export class MetaTagEntity extends BaseEntity<any> {
  @Column('nvarchar', {
    name: 'name',
    nullable: false
  })
  name: string

  @Column('nvarchar', {
    name: 'value',
    nullable: false
  })
  value: string

  @Column('int', {
    name: 'sortOrder',
    nullable: false
  })
  sortOrder: number

  @Column('char', {
    name: 'referenceId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  referenceId: string

  @Column('enum', {
    name: 'referenceType',
    nullable: false,
    enum: MetaTagReferenceType
  })
  referenceType: MetaTagReferenceType

  @Column('enum', {
    name: 'status',
    nullable: false,
    enum: MetaTagStatus
  })
  status: MetaTagStatus
}
