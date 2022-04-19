import { GetTemplateHandler } from '@vg/service-catalog/modules/template/queries/handlers/get-template.handler'
import { GetTemplatesHandler } from '@vg/service-catalog/modules/template/queries/handlers/get-templates.handler'
import { GetTemplatesTotalHandler } from '@vg/service-catalog/modules/template/queries/handlers/get-templates-total.handler'

export const QueryHandlers = [
  GetTemplateHandler,
  GetTemplatesHandler,
  GetTemplatesTotalHandler
]

