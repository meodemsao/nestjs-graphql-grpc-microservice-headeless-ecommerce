import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductLocation } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteProductLocationCommand } from '@vg/service-catalog/modules/productLocation/commands'
import { ProductLocationService } from '@vg/service-catalog/modules/productLocation/productLocation.service'

@CommandHandler(DeleteProductLocationCommand)
export class DeleteProductLocationHandler implements ICommandHandler<DeleteProductLocationCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductLocationService
  ) {
  }

  async execute(command: DeleteProductLocationCommand): Promise<ProductLocation> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ProductLocation
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
