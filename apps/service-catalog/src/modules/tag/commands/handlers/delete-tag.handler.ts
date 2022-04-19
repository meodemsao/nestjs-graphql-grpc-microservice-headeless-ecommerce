import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Tag } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteTagCommand } from '@vg/service-catalog/modules/tag/commands'
import { TagService } from '@vg/service-catalog/modules/tag/tag.service'

@CommandHandler(DeleteTagCommand)
export class DeleteTagHandler implements ICommandHandler<DeleteTagCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: TagService
  ) {
  }

  async execute(command: DeleteTagCommand): Promise<Tag> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as Tag
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
