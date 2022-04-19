import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('categoryLocation')
export class CategoryLocationEntity extends BaseEntity<any> {
  @Column('char', { name: 'categoryId', nullable: false, length: ID_FIELD_LENGTH })
  categoryId: string

  @Column('char', { name: 'locationId', nullable: false, length: ID_FIELD_LENGTH })
  locationId: string
}
