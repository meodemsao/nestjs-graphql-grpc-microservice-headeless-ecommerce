import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { CategoryStoreService } from '@vg/service-catalog/modules/categoryStore/categoryStore.service'
import { CategoryStore } from '@vg/proto-schema'
import { UpdateCategoryStoreCommand } from '@vg/service-catalog/modules/categoryStore/commands'

@CommandHandler(UpdateCategoryStoreCommand)
export class UpdateCategoryStoreHandler implements ICommandHandler<UpdateCategoryStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CategoryStoreService
  ) {
  }

  async execute(command: UpdateCategoryStoreCommand): Promise<CategoryStore> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as CategoryStore
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
