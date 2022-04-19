import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductLocationService } from '@vg/service-catalog/modules/productLocation/productLocation.service'
import { ProductLocation } from '@vg/proto-schema'
import { UpdateProductLocationCommand } from '@vg/service-catalog/modules/productLocation/commands'

@CommandHandler(UpdateProductLocationCommand)
export class UpdateProductLocationHandler implements ICommandHandler<UpdateProductLocationCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductLocationService
  ) {
  }

  async execute(command: UpdateProductLocationCommand): Promise<ProductLocation> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as ProductLocation
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
