import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { CategoryLocationService } from '@vg/service-catalog/modules/categoryLocation/categoryLocation.service'
import { CategoryLocation } from '@vg/proto-schema'
import { UpdateCategoryLocationCommand } from '@vg/service-catalog/modules/categoryLocation/commands'

@CommandHandler(UpdateCategoryLocationCommand)
export class UpdateCategoryLocationHandler implements ICommandHandler<UpdateCategoryLocationCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CategoryLocationService
  ) {
  }

  async execute(command: UpdateCategoryLocationCommand): Promise<CategoryLocation> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as CategoryLocation
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
