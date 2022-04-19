import { ID, Int, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'
import { ConfigSettingStatus } from '@vg/repository/enums'

@ObjectType('ConfigSetting')
export class ConfigSettingDto extends BaseDto {

  @FilterableField(() => String, { nullable: false, description: 'Tên hiển thị' })
  name: string

  @FilterableField(() => String, { nullable: false, description: 'Khoá (Unique)' })
  alias: string

  @FilterableField(() => String, { nullable: false, description: 'Giá trị' })
  value: string

  @FilterableField(() => Int, { nullable: false, description: 'Thứ tự hiển thị' })
  sortOrder: number

  @FilterableField(() => ConfigSettingStatus, { nullable: false, description: 'Trạng thái' })
  status: ConfigSettingStatus

}
