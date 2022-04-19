import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductImage } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateProductImageCommand } from '@vg/service-catalog/modules/productImage/commands'
import { ProductImageService } from '@vg/service-catalog/modules/productImage/productImage.service'

@CommandHandler(CreateProductImageCommand)
export class CreateProductImageHandler implements ICommandHandler<CreateProductImageCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductImageService
  ) {
  }

  async execute(command: CreateProductImageCommand): Promise<ProductImage> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ProductImage
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
