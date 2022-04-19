import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('productImage')
export class ProductImageEntity extends BaseEntity<any> {
  @Column('char', { name: 'productId', nullable: false, length: ID_FIELD_LENGTH })
  productId: string

  @Column('nvarchar', { name: 'imageUrl', nullable: false })
  imageUrl: string

  @Column('int', { name: 'sortOrder', nullable: false, default: 0 })
  sortOrder: number
}
