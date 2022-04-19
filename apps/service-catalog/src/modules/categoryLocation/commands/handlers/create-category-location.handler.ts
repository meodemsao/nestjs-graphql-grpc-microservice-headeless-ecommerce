import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CategoryLocation } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateCategoryLocationCommand } from '@vg/service-catalog/modules/categoryLocation/commands'
import { CategoryLocationService } from '@vg/service-catalog/modules/categoryLocation/categoryLocation.service'

@CommandHandler(CreateCategoryLocationCommand)
export class CreateCategoryLocationHandler implements ICommandHandler<CreateCategoryLocationCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CategoryLocationService
  ) {
  }

  async execute(command: CreateCategoryLocationCommand): Promise<CategoryLocation> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as CategoryLocation
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
