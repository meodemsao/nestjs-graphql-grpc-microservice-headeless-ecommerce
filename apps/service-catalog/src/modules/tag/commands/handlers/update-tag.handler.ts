import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { TagService } from '@vg/service-catalog/modules/tag/tag.service'
import { Tag } from '@vg/proto-schema'
import { UpdateTagCommand } from '@vg/service-catalog/modules/tag/commands'

@CommandHandler(UpdateTagCommand)
export class UpdateTagHandler implements ICommandHandler<UpdateTagCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: TagService
  ) {
  }

  async execute(command: UpdateTagCommand): Promise<Tag> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as Tag
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
