import { CreateManufacturerHandler } from '@vg/service-catalog/modules/manufacturer/commands/handlers/create-manufacturer.handler'
import { UpdateManufacturerHandler } from '@vg/service-catalog/modules/manufacturer/commands/handlers/update-manufacturer.handler'
import { DeleteManufacturerHandler } from '@vg/service-catalog/modules/manufacturer/commands/handlers/delete-manufacturer.handler'

export const CommandHandlers = [
  CreateManufacturerHandler,
  UpdateManufacturerHandler,
  DeleteManufacturerHandler
]
