import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('productCategory')
export class ProductCategoryEntity extends BaseEntity<any> {
  @Column('char', { name: 'productId', nullable: false, length: ID_FIELD_LENGTH })
  productId: string

  @Column('char', { name: 'categoryId', nullable: false, length: ID_FIELD_LENGTH })
  categoryId: string

  @Column('int', { name: 'sortOrder', nullable: false, default: 0 })
  sortOrder: number
}
