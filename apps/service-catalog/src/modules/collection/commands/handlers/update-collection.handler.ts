import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { CollectionService } from '@vg/service-catalog/modules/collection/collection.service'
import { Collection } from '@vg/proto-schema'
import { UpdateCollectionCommand } from '@vg/service-catalog/modules/collection/commands'

@CommandHandler(UpdateCollectionCommand)
export class UpdateCollectionHandler implements ICommandHandler<UpdateCollectionCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CollectionService
  ) {
  }

  async execute(command: UpdateCollectionCommand): Promise<Collection> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as Collection
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
