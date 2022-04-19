import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { CollectionStoreService } from '@vg/service-catalog/modules/collectionStore/collectionStore.service'
import { CollectionStore } from '@vg/proto-schema'
import { UpdateCollectionStoreCommand } from '@vg/service-catalog/modules/collectionStore/commands'

@CommandHandler(UpdateCollectionStoreCommand)
export class UpdateCollectionStoreHandler implements ICommandHandler<UpdateCollectionStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CollectionStoreService
  ) {
  }

  async execute(command: UpdateCollectionStoreCommand): Promise<CollectionStore> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as CollectionStore
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
