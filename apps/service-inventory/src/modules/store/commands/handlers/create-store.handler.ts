import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Store } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateStoreCommand } from '@vg/service-inventory/modules/store/commands'
import { StoreService } from '@vg/service-inventory/modules/store/store.service'

@CommandHandler(CreateStoreCommand)
export class CreateStoreHandler implements ICommandHandler<CreateStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: StoreService
  ) {}

  async execute(command: CreateStoreCommand): Promise<Store> {
    this.logger.log(`execute create store command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as Store
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
