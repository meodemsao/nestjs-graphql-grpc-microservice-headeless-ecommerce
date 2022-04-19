import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('manufacturerStore')
export class ManufacturerStoreEntity extends BaseEntity<any> {
  @Column('char', { name: 'manufacturerId', nullable: false, length: ID_FIELD_LENGTH })
  manufacturerId: string

  @Column('char', { name: 'storeId', nullable: false, length: ID_FIELD_LENGTH })
  storeId: string
}
