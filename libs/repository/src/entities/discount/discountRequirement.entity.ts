import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import {
  DiscountRequirementType,
  DiscountRequirementStatus
} from '@vg/repository/enums'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('discountRequirement')
export class DiscountRequirementEntity extends BaseEntity<any> {
  @Column('nvarchar', { name: 'name', nullable: false })
  name: string

  @Column('nvarchar', { name: 'description', nullable: false })
  description: string

  @Column('enum', {
    name: 'type',
    nullable: false,
    enum: DiscountRequirementType
  })
  type: DiscountRequirementType

  @Column('enum', {
    name: 'status',
    nullable: false,
    enum: DiscountRequirementStatus
  })
  status: DiscountRequirementStatus

  @Column('nvarchar', { name: 'arguments', nullable: false })
  arguments: string
}
