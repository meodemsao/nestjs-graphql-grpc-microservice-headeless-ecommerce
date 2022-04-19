import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CollectionLocation } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateCollectionLocationCommand } from '@vg/service-catalog/modules/collectionLocation/commands'
import { CollectionLocationService } from '@vg/service-catalog/modules/collectionLocation/collectionLocation.service'

@CommandHandler(CreateCollectionLocationCommand)
export class CreateCollectionLocationHandler implements ICommandHandler<CreateCollectionLocationCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CollectionLocationService
  ) {
  }

  async execute(command: CreateCollectionLocationCommand): Promise<CollectionLocation> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as CollectionLocation
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
