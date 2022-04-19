import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CategoryLocation } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteCategoryLocationCommand } from '@vg/service-catalog/modules/categoryLocation/commands'
import { CategoryLocationService } from '@vg/service-catalog/modules/categoryLocation/categoryLocation.service'

@CommandHandler(DeleteCategoryLocationCommand)
export class DeleteCategoryLocationHandler implements ICommandHandler<DeleteCategoryLocationCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CategoryLocationService
  ) {
  }

  async execute(command: DeleteCategoryLocationCommand): Promise<CategoryLocation> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as CategoryLocation
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
