import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { StoreService } from '@vg/service-inventory/modules/store/store.service'
import { Store } from '@vg/proto-schema'
import { UpdateStoreCommand } from '@vg/service-inventory/modules/store/commands'

@CommandHandler(UpdateStoreCommand)
export class UpdateStoreHandler implements ICommandHandler<UpdateStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: StoreService
  ) {}

  async execute(command: UpdateStoreCommand): Promise<Store> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as Store
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
