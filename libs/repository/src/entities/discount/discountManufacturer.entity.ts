import { ID_FIELD_LENGTH } from '@vg/core'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'

@Entity('discountManufacturer')
export class DiscountManufacturerEntity extends BaseEntity<any> {
  @Column('char', {
    name: 'discountId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  discountId: string

  @Column('char', {
    name: 'manufacturerId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  manufacturerId: string
}
