import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Collection } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateCollectionCommand } from '@vg/service-catalog/modules/collection/commands'
import { CollectionService } from '@vg/service-catalog/modules/collection/collection.service'

@CommandHandler(CreateCollectionCommand)
export class CreateCollectionHandler implements ICommandHandler<CreateCollectionCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CollectionService
  ) {
  }

  async execute(command: CreateCollectionCommand): Promise<Collection> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as Collection
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
