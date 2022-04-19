import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CollectionStore } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateCollectionStoreCommand } from '@vg/service-catalog/modules/collectionStore/commands'
import { CollectionStoreService } from '@vg/service-catalog/modules/collectionStore/collectionStore.service'

@CommandHandler(CreateCollectionStoreCommand)
export class CreateCollectionStoreHandler implements ICommandHandler<CreateCollectionStoreCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CollectionStoreService
  ) {
  }

  async execute(command: CreateCollectionStoreCommand): Promise<CollectionStore> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as CollectionStore
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
