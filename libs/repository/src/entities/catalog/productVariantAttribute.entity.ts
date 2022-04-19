import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('productVariantAttribute')
export class ProductVariantAttributeEntity extends BaseEntity<any> {
  @Column('char', {
    name: 'productVariantId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  productVariantId: string

  @Column('char', {
    name: 'attributeId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  attributeId: string

  @Column('nvarchar', {
    name: 'attributeName',
    nullable: false
  })
  attributeName: string

  @Column('char', {
    name: 'attributeOptionId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  attributeOptionId: string

  @Column('nvarchar', {
    name: 'attributeValue',
    nullable: false
  })
  attributeValue: string

  @Column('int', {
    name: 'sortOrder',
    nullable: false
  })
  sortOrder: number
}
