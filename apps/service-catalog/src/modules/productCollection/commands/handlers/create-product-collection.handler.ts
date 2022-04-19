import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductCollection } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateProductCollectionCommand } from '@vg/service-catalog/modules/productCollection/commands'
import { ProductCollectionService } from '@vg/service-catalog/modules/productCollection/productCollection.service'

@CommandHandler(CreateProductCollectionCommand)
export class CreateProductCollectionHandler implements ICommandHandler<CreateProductCollectionCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductCollectionService
  ) {
  }

  async execute(command: CreateProductCollectionCommand): Promise<ProductCollection> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ProductCollection
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
