import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CategoryStore } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateCategoryStoreCommand } from '@vg/service-catalog/modules/categoryStore/commands'
import { CategoryStoreService } from '@vg/service-catalog/modules/categoryStore/categoryStore.service'

@CommandHandler(CreateCategoryStoreCommand)
export class CreateCategoryStoreHandler implements ICommandHandler<CreateCategoryStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CategoryStoreService
  ) {
  }

  async execute(command: CreateCategoryStoreCommand): Promise<CategoryStore> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as CategoryStore
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
