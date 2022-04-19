import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('productLocation')
export class ProductLocationEntity extends BaseEntity<any> {
  @Column('char', { name: 'productId', nullable: false, length: ID_FIELD_LENGTH })
  productId: string

  @Column('char', { name: 'locationId', nullable: false, length: ID_FIELD_LENGTH })
  locationId: string
}
