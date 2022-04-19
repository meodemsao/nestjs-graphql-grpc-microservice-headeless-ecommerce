import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductCollection } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteProductCollectionCommand } from '@vg/service-catalog/modules/productCollection/commands'
import { ProductCollectionService } from '@vg/service-catalog/modules/productCollection/productCollection.service'

@CommandHandler(DeleteProductCollectionCommand)
export class DeleteProductCollectionHandler implements ICommandHandler<DeleteProductCollectionCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductCollectionService
  ) {
  }

  async execute(command: DeleteProductCollectionCommand): Promise<ProductCollection> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ProductCollection
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
