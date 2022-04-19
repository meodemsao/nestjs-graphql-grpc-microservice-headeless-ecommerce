import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Collection } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteCollectionCommand } from '@vg/service-catalog/modules/collection/commands'
import { CollectionService } from '@vg/service-catalog/modules/collection/collection.service'

@CommandHandler(DeleteCollectionCommand)
export class DeleteCollectionHandler implements ICommandHandler<DeleteCollectionCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CollectionService
  ) {
  }

  async execute(command: DeleteCollectionCommand): Promise<Collection> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as Collection
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
