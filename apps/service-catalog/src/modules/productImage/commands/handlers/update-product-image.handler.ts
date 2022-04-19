import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductImageService } from '@vg/service-catalog/modules/productImage/productImage.service'
import { ProductImage } from '@vg/proto-schema'
import { UpdateProductImageCommand } from '@vg/service-catalog/modules/productImage/commands'

@CommandHandler(UpdateProductImageCommand)
export class UpdateProductImageHandler implements ICommandHandler<UpdateProductImageCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductImageService
  ) {
  }

  async execute(command: UpdateProductImageCommand): Promise<ProductImage> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as ProductImage
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
