import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Product } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteProductCommand } from '@vg/service-catalog/modules/product/commands'
import { ProductService } from '@vg/service-catalog/modules/product/product.service'

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductService
  ) {
  }

  async execute(command: DeleteProductCommand): Promise<Product> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as unknown as Product
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
