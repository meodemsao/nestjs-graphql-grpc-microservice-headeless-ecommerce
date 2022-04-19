import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { AttributeValueType, AttributeStatus } from '@vg/repository/enums'

@Entity('attribute')
export class AttributeEntity extends BaseEntity<any> {
  @Column('nvarchar', {
    name: 'name',
    nullable: false
  })
  name: string

  @Column('nvarchar', {
    name: 'code',
    nullable: false
  })
  code: string

  @Column('nvarchar', {
    name: 'description',
    nullable: true
  })
  description: string

  @Column('bool', { name: 'isVariant', nullable: false, default: false })
  isVariant: boolean

  @Column('enum', {
    name: 'valueType',
    nullable: false,
    default: AttributeValueType.String,
    enum: AttributeValueType
  })
  valueType: AttributeValueType

  @Column('enum', {
    name: 'status',
    nullable: false,
    default: AttributeStatus.Active,
    enum: AttributeStatus
  })
  status: AttributeStatus
}
