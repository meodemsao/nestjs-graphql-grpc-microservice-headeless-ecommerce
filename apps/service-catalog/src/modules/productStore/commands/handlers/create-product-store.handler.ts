import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductStore } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateProductStoreCommand } from '@vg/service-catalog/modules/productStore/commands'
import { ProductStoreService } from '@vg/service-catalog/modules/productStore/productStore.service'

@CommandHandler(CreateProductStoreCommand)
export class CreateProductStoreHandler implements ICommandHandler<CreateProductStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductStoreService
  ) {
  }

  async execute(command: CreateProductStoreCommand): Promise<ProductStore> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ProductStore
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
