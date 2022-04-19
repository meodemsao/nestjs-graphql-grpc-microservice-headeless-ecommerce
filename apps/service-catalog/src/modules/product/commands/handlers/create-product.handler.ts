import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Product } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateProductCommand } from '@vg/service-catalog/modules/product/commands'
import { ProductService } from '@vg/service-catalog/modules/product/product.service'

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductService
  ) {
  }

  async execute(command: CreateProductCommand): Promise<Product> {
    this.logger.log(`execute create catalog command`)
    try {
      console.log('command............', command.request.data)
      const result = await this.service.create(command.request.data)
      return result as Product
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
