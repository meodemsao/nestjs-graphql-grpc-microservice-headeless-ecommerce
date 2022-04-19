import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { ID_FIELD_LENGTH } from '@vg/core'

@Entity('manufacturerLocation')
export class ManufacturerLocationEntity extends BaseEntity<any> {
  @Column('char', { name: 'manufacturerId', nullable: false, length: ID_FIELD_LENGTH })
  manufacturerId: string

  @Column('char', { name: 'locationId', nullable: false, length: ID_FIELD_LENGTH })
  locationId: string
}
