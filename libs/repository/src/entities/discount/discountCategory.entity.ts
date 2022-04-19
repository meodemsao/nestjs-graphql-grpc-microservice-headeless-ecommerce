import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'

import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('discountCategory')
export class DiscountCategoryEntity extends BaseEntity<any> {
  @Column('char', {
    name: 'discountId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  discountId: string

  @Column('char', {
    name: 'categoryId',
    nullable: false,
    length: ID_FIELD_LENGTH
  })
  categoryId: string
}
