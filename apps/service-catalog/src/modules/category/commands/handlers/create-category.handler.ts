import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Category } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CategoryService } from '@vg/service-catalog/modules/category/category.service'
import { CreateCategoryCommand } from '@vg/service-catalog/modules/category/commands'
import { CategoryCreatedEvent } from '@vg/event'
import { CategoryEntity } from '@vg/repository/entities'

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly catalogService: CategoryService
  ) {
  }

  async execute(command: CreateCategoryCommand): Promise<Category> {
    this.logger.log(`execute create catalog command`)
    try {
      const category = await this.catalogService.create(command.createCategoryRequest.data)
      this.eventBus.publish(new CategoryCreatedEvent(category as CategoryEntity))
      return category as Category
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
