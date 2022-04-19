import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('productAttribute')
export class ProductAttributeEntity extends BaseEntity<any> {
  @Column('char', { name: 'productId', nullable: false, length: ID_FIELD_LENGTH })
  productId: string

  @Column('char', { name: 'attributeId', nullable: false, length: ID_FIELD_LENGTH })
  attributeId: string

  @Column('nvarchar', { name: 'attributeName', nullable: true })
  attributeName: string

  @Column('char', { name: 'attributeOptionId', nullable: true, length: ID_FIELD_LENGTH })
  attributeOptionId: string

  @Column('nvarchar', { name: 'attributeValue', nullable: true })
  attributeValue: string

  @Column('int', { name: 'sortOrder', nullable: false, default: 0 })
  sortOrder: number
}
