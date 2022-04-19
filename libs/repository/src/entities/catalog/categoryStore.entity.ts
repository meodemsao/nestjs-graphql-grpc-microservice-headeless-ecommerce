import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('categoryStore')
export class CategoryStoreEntity extends BaseEntity<any> {
  @Column('char', { name: 'categoryId', nullable: false, length: ID_FIELD_LENGTH })
  categoryId: string

  @Column('char', { name: 'storeId', nullable: false, length: ID_FIELD_LENGTH })
  storeId: string
}
