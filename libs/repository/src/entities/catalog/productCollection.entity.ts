import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('productCollection')
export class ProductCollectionEntity extends BaseEntity<any> {
  @Column('char', { name: 'productId', nullable: false, length: ID_FIELD_LENGTH })
  productId: string

  @Column('char', { name: 'collectionId', nullable: false, length: ID_FIELD_LENGTH })
  collectionId: string

  @Column('int', { name: 'sortOrder', nullable: false, default: 0 })
  sortOrder: number
}
