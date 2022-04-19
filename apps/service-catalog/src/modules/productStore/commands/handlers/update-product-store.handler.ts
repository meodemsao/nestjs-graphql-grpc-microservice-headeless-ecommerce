import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductStoreService } from '@vg/service-catalog/modules/productStore/productStore.service'
import { ProductStore } from '@vg/proto-schema'
import { UpdateProductStoreCommand } from '@vg/service-catalog/modules/productStore/commands'

@CommandHandler(UpdateProductStoreCommand)
export class UpdateProductStoreHandler implements ICommandHandler<UpdateProductStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductStoreService
  ) {
  }

  async execute(command: UpdateProductStoreCommand): Promise<ProductStore> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as ProductStore
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
