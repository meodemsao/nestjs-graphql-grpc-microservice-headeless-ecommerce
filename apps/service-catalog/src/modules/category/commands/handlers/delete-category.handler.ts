import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Category } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CategoryService } from '@vg/service-catalog/modules/category/category.service'
import { DeleteCategoryCommand } from '@vg/service-catalog/modules/category/commands'

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly catalogService: CategoryService
  ) {
  }

  async execute(command: DeleteCategoryCommand): Promise<Category> {
    try {
      const category = await this.catalogService.delete(command.data.id)

      return category as Category
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
