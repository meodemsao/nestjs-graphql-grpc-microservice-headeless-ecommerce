import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base.entity'

import { ID_FIELD_LENGTH } from '@vg/core'
import { ConfigSettingStatus } from '@vg/repository/enums'

@Entity('configSetting')
export class ConfigSettingEntity extends BaseEntity<any> {
  @Column('nvarchar', {
    name: 'name',
    nullable: false
  })
  name: string

  @Column('nvarchar', {
    name: 'alias',
    nullable: false
  })
  alias: string

  @Column('nvarchar', {
    name: 'value',
    nullable: false
  })
  value: string

  @Column('int', {
    name: 'sortOrder',
    nullable: false,
    default: 0
  })
  sortOrder: number

  @Column('enum', {
    name: 'status',
    nullable: false,
    enum: ConfigSettingStatus,
    default: ConfigSettingStatus.Active
  })
  status: ConfigSettingStatus
}
