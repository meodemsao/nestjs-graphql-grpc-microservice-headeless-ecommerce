import { CreateLocationHandler } from '@vg/service-inventory/modules/location/commands/handlers/create-location.handler'
import { UpdateLocationHandler } from '@vg/service-inventory/modules/location/commands/handlers/update-location.handler'
import { DeleteLocationHandler } from '@vg/service-inventory/modules/location/commands/handlers/delete-location.handler'

export const CommandHandlers = [
  CreateLocationHandler,
  UpdateLocationHandler,
  DeleteLocationHandler
]
