import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { CollectionLocationService } from '@vg/service-catalog/modules/collectionLocation/collectionLocation.service'
import { CollectionLocation } from '@vg/proto-schema'
import { UpdateCollectionLocationCommand } from '@vg/service-catalog/modules/collectionLocation/commands'

@CommandHandler(UpdateCollectionLocationCommand)
export class UpdateCollectionLocationHandler implements ICommandHandler<UpdateCollectionLocationCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: CollectionLocationService
  ) {
  }

  async execute(command: UpdateCollectionLocationCommand): Promise<CollectionLocation> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as CollectionLocation
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
