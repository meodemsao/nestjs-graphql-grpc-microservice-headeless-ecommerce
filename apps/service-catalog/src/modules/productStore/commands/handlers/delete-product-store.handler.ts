import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductStore } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteProductStoreCommand } from '@vg/service-catalog/modules/productStore/commands'
import { ProductStoreService } from '@vg/service-catalog/modules/productStore/productStore.service'

@CommandHandler(DeleteProductStoreCommand)
export class DeleteProductStoreHandler implements ICommandHandler<DeleteProductStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductStoreService
  ) {
  }

  async execute(command: DeleteProductStoreCommand): Promise<ProductStore> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ProductStore
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
