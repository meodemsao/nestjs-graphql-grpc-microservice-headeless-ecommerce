import { CreateManufacturerLocationHandler } from '@vg/service-catalog/modules/manufacturerLocation/commands/handlers/create-manufacturer-location.handler'
import { UpdateManufacturerLocationHandler } from '@vg/service-catalog/modules/manufacturerLocation/commands/handlers/update-manufacturer-location.handler'
import { DeleteManufacturerLocationHandler } from '@vg/service-catalog/modules/manufacturerLocation/commands/handlers/delete-manufacturer-location.handler'

export const CommandHandlers = [
  CreateManufacturerLocationHandler,
  UpdateManufacturerLocationHandler,
  DeleteManufacturerLocationHandler
]
