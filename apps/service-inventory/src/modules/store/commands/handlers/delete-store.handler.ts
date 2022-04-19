import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Store } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteStoreCommand } from '@vg/service-inventory/modules/store/commands'
import { StoreService } from '@vg/service-inventory/modules/store/store.service'

@CommandHandler(DeleteStoreCommand)
export class DeleteStoreHandler implements ICommandHandler<DeleteStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: StoreService
  ) {}

  async execute(command: DeleteStoreCommand): Promise<Store> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as Store
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
