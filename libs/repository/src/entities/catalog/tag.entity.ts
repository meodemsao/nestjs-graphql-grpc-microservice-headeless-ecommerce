import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'
import { TagStatus } from '@vg/repository/enums'

@Entity('tag')
export class TagEntity extends BaseEntity<any> {
  @Column('nvarchar', { name: 'name', nullable: true })
  name: string

  @Column('enum', { name: 'status', nullable: false, enum: TagStatus })
  status: TagStatus
}
