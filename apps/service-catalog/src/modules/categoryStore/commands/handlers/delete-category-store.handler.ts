import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CategoryStore } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteCategoryStoreCommand } from '@vg/service-catalog/modules/categoryStore/commands'
import { CategoryStoreService } from '@vg/service-catalog/modules/categoryStore/categoryStore.service'

@CommandHandler(DeleteCategoryStoreCommand)
export class DeleteCategoryStoreHandler implements ICommandHandler<DeleteCategoryStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CategoryStoreService
  ) {
  }

  async execute(command: DeleteCategoryStoreCommand): Promise<CategoryStore> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as CategoryStore
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
