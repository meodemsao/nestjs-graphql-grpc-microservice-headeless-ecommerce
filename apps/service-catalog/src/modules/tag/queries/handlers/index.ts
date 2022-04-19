import { GetTagHandler } from '@vg/service-catalog/modules/tag/queries/handlers/get-tag.handler'
import { GetTagsHandler } from '@vg/service-catalog/modules/tag/queries/handlers/get-tags.handler'
import { GetTagsTotalHandler } from '@vg/service-catalog/modules/tag/queries/handlers/get-tags-total.handler'

export const QueryHandlers = [
  GetTagHandler,
  GetTagsHandler,
  GetTagsTotalHandler
]

