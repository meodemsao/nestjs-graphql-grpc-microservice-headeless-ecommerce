import { CreateManufacturerStoreHandler } from '@vg/service-catalog/modules/manufacturerStore/commands/handlers/create-manufacturer-store.handler'
import { UpdateManufacturerStoreHandler } from '@vg/service-catalog/modules/manufacturerStore/commands/handlers/update-manufacturer-store.handler'
import { DeleteManufacturerStoreHandler } from '@vg/service-catalog/modules/manufacturerStore/commands/handlers/delete-manufacturer-store.handler'

export const CommandHandlers = [
  CreateManufacturerStoreHandler,
  UpdateManufacturerStoreHandler,
  DeleteManufacturerStoreHandler
]
