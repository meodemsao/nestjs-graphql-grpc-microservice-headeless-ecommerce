import { ID_FIELD_LENGTH } from '@vg/core'
import {
  DiscountLimitation,
  DiscountPriority,
  DiscountStatus,
  DiscountType
} from '@vg/repository/enums'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'

@Entity('discount')
export class DiscountEntity extends BaseEntity<any> {
  @Column('nvarchar', { name: 'name', nullable: false })
  name: string

  @Column('nvarchar', { name: 'description', nullable: false })
  description: string

  @Column('bool', {
    name: 'requireCouponCode',
    nullable: false
  })
  requireCouponCode: boolean

  @Column('nvarchar', { name: 'couponCode', nullable: true })
  couponCode?: string

  @Column({ name: 'startAt', nullable: true, type: 'timestamp' })
  startAt?: Date

  @Column({ name: 'endAt', nullable: true, type: 'timestamp' })
  endAt?: Date

  @Column('enum', {
    name: 'discountType',
    nullable: false,
    enum: DiscountType
  })
  discountType: DiscountType

  @Column('decimal', { name: 'discountAmount', nullable: false, default: 0 })
  discountAmount: number

  @Column('bool', { name: 'usePercentage', nullable: false })
  usePercentage: boolean

  @Column('decimal', {
    name: 'discountPercentage',
    nullable: false,
    default: 0
  })
  discountPercentage: number

  @Column('decimal', {
    name: 'maximumDiscountAmount',
    nullable: true,
    default: 0
  })
  maximumDiscountAmount?: number

  @Column('bool', { name: 'isCumulative', nullable: false })
  isCumulative: boolean

  @Column('enum', {
    name: 'discountLimitation',
    nullable: false,
    enum: DiscountLimitation
  })
  discountLimitation: DiscountLimitation

  @Column('int', { name: 'limitationTimes', nullable: false, default: 0 })
  limitationTimes: number

  @Column('char', {
    name: 'discountRequirementId',
    nullable: true,
    length: ID_FIELD_LENGTH
  })
  discountRequirementId: string

  @Column('enum', {
    name: 'priority',
    nullable: false,
    enum: DiscountPriority
  })
  priority: DiscountPriority

  @Column('enum', {
    name: 'status',
    nullable: false,
    default: DiscountStatus.Active,
    enum: DiscountStatus
  })
  status: DiscountStatus
}
