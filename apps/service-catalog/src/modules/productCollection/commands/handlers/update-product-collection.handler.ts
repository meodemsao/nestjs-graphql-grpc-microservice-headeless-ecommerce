import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductCollectionService } from '@vg/service-catalog/modules/productCollection/productCollection.service'
import { ProductCollection } from '@vg/proto-schema'
import { UpdateProductCollectionCommand } from '@vg/service-catalog/modules/productCollection/commands'

@CommandHandler(UpdateProductCollectionCommand)
export class UpdateProductCollectionHandler implements ICommandHandler<UpdateProductCollectionCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductCollectionService
  ) {
  }

  async execute(command: UpdateProductCollectionCommand): Promise<ProductCollection> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as ProductCollection
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
