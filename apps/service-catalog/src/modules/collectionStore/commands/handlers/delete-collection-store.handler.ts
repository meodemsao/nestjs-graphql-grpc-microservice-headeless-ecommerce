import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CollectionStore } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteCollectionStoreCommand } from '@vg/service-catalog/modules/collectionStore/commands'
import { CollectionStoreService } from '@vg/service-catalog/modules/collectionStore/collectionStore.service'

@CommandHandler(DeleteCollectionStoreCommand)
export class DeleteCollectionStoreHandler implements ICommandHandler<DeleteCollectionStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CollectionStoreService
  ) {
  }

  async execute(command: DeleteCollectionStoreCommand): Promise<CollectionStore> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as CollectionStore
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
