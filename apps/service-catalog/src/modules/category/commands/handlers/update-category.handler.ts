import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Category } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CategoryService } from '@vg/service-catalog/modules/category/category.service'
import { UpdateCategoryCommand } from '@vg/service-catalog/modules/category/commands'

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly catalogService: CategoryService
  ) {
  }

  async execute(command: UpdateCategoryCommand): Promise<Category> {
    try {
      const category = await this.catalogService.update(command.data.id, command.data.data)

      return category as Category
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
