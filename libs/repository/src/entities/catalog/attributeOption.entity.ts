import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('attributeOption')
export class AttributeOptionEntity extends BaseEntity<any> {
  @Column('char', {
    name: 'attributeId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  attributeId: string

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
}
