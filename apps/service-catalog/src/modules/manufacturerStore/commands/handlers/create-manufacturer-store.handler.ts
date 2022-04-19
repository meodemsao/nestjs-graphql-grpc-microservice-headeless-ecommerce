import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ManufacturerStore } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateManufacturerStoreCommand } from '@vg/service-catalog/modules/manufacturerStore/commands'
import { ManufacturerStoreService } from '@vg/service-catalog/modules/manufacturerStore/manufacturerStore.service'

@CommandHandler(CreateManufacturerStoreCommand)
export class CreateManufacturerStoreHandler implements ICommandHandler<CreateManufacturerStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ManufacturerStoreService
  ) {
  }

  async execute(command: CreateManufacturerStoreCommand): Promise<ManufacturerStore> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ManufacturerStore
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
