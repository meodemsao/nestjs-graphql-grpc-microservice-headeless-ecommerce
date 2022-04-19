import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ManufacturerStore } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteManufacturerStoreCommand } from '@vg/service-catalog/modules/manufacturerStore/commands'
import { ManufacturerStoreService } from '@vg/service-catalog/modules/manufacturerStore/manufacturerStore.service'

@CommandHandler(DeleteManufacturerStoreCommand)
export class DeleteManufacturerStoreHandler implements ICommandHandler<DeleteManufacturerStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ManufacturerStoreService
  ) {
  }

  async execute(command: DeleteManufacturerStoreCommand): Promise<ManufacturerStore> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ManufacturerStore
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
