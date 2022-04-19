import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('collectionStore')
export class CollectionStoreEntity extends BaseEntity<any> {
  @Column('char', { name: 'collectionId', nullable: false, length: ID_FIELD_LENGTH })
  collectionId: string

  @Column('char', { name: 'storeId', nullable: false, length: ID_FIELD_LENGTH })
  storeId: string
}
