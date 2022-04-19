import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'

import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('discountUsageHistory')
export class DiscountUsageHistoryEntity extends BaseEntity<any> {
  @Column('char', {
    name: 'discountId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  discountId: string

  @Column('char', {
    name: 'orderId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  orderId: string
}
