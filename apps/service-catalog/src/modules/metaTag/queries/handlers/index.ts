import { GetMetaTagHandler } from '@vg/service-catalog/modules/metaTag/queries/handlers/get-meta-tag.handler'
import { GetMetaTagsHandler } from '@vg/service-catalog/modules/metaTag/queries/handlers/get-meta-tags.handler'
import { GetMetaTagsTotalHandler } from '@vg/service-catalog/modules/metaTag/queries/handlers/get-meta-tags-total.handler'

export const QueryHandlers = [
  GetMetaTagHandler,
  GetMetaTagsHandler,
  GetMetaTagsTotalHandler
]
