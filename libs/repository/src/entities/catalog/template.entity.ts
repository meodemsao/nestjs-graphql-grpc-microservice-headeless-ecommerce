import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { TemplateType } from '@vg/repository/enums'

@Entity('template')
export class TemplateEntity extends BaseEntity<any> {
  @Column('nvarchar', { name: 'name', nullable: true })
  name: string

  @Column('nvarchar', { name: 'previewImageUrl', nullable: true })
  previewImageUrl: string

  @Column('enum', { name: 'type', nullable: false, enum: TemplateType })
  type: TemplateType

  @Column('int', { name: 'sortOrder', nullable: false, default: 0 })
  sortOrder: number
}
