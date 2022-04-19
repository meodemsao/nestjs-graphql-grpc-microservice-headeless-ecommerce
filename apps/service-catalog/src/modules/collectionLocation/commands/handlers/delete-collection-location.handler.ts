import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CollectionLocation } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteCollectionLocationCommand } from '@vg/service-catalog/modules/collectionLocation/commands'
import { CollectionLocationService } from '@vg/service-catalog/modules/collectionLocation/collectionLocation.service'

@CommandHandler(DeleteCollectionLocationCommand)
export class DeleteCollectionLocationHandler implements ICommandHandler<DeleteCollectionLocationCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CollectionLocationService
  ) {
  }

  async execute(command: DeleteCollectionLocationCommand): Promise<CollectionLocation> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as CollectionLocation
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
