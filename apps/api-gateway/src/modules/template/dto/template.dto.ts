import { Int, ObjectType } from '@nestjs/graphql'
import { BaseDto } from '@vg/repository/dtos'
import {
  FilterableField
} from '@vg/query-graphql'
import { TemplateType } from '@vg/repository/enums'

@ObjectType('Template')
export class TemplateDto extends BaseDto {

  @FilterableField(() => String, { nullable: false, description: 'Tên mẫu hiển thị' })
  name: string

  @FilterableField(() => String, { nullable: false, description: 'Đường dẫn ảnh minh hoạ' })
  previewImageUrl: string

  @FilterableField(() => TemplateType, { nullable: false })
  type: TemplateType

  @FilterableField(() => Int, { nullable: false, description: 'Thứ tự hiển thị' })
  sortOrder: number

}
