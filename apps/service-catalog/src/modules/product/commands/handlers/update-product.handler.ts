import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductService } from '@vg/service-catalog/modules/product/product.service'
import { Product } from '@vg/proto-schema'
import { UpdateProductCommand } from '@vg/service-catalog/modules/product/commands'

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductService
  ) {
  }

  async execute(command: UpdateProductCommand): Promise<Product> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as unknown  as Product
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
