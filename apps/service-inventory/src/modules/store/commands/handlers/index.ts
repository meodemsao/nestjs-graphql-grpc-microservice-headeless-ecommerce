import { CreateStoreHandler } from '@vg/service-inventory/modules/store/commands/handlers/create-store.handler'
import { UpdateStoreHandler } from '@vg/service-inventory/modules/store/commands/handlers/update-store.handler'
import { DeleteStoreHandler } from '@vg/service-inventory/modules/store/commands/handlers/delete-store.handler'

export const CommandHandlers = [
  CreateStoreHandler,
  UpdateStoreHandler,
  DeleteStoreHandler
]
