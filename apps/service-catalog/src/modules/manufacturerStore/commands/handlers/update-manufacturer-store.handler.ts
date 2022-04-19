import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ManufacturerStoreService } from '@vg/service-catalog/modules/manufacturerStore/manufacturerStore.service'
import { ManufacturerStore } from '@vg/proto-schema'
import { UpdateManufacturerStoreCommand } from '@vg/service-catalog/modules/manufacturerStore/commands'

@CommandHandler(UpdateManufacturerStoreCommand)
export class UpdateManufacturerStoreHandler implements ICommandHandler<UpdateManufacturerStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ManufacturerStoreService
  ) {
  }

  async execute(command: UpdateManufacturerStoreCommand): Promise<ManufacturerStore> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as ManufacturerStore
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
