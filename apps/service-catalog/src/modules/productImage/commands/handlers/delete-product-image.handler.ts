import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductImage } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteProductImageCommand } from '@vg/service-catalog/modules/productImage/commands'
import { ProductImageService } from '@vg/service-catalog/modules/productImage/productImage.service'

@CommandHandler(DeleteProductImageCommand)
export class DeleteProductImageHandler implements ICommandHandler<DeleteProductImageCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductImageService
  ) {
  }

  async execute(command: DeleteProductImageCommand): Promise<ProductImage> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ProductImage
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
