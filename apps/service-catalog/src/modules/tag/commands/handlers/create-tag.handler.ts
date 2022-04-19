import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Tag } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateTagCommand } from '@vg/service-catalog/modules/tag/commands'
import { TagService } from '@vg/service-catalog/modules/tag/tag.service'

@CommandHandler(CreateTagCommand)
export class CreateTagHandler implements ICommandHandler<CreateTagCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: TagService
  ) {
  }

  async execute(command: CreateTagCommand): Promise<Tag> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as Tag
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
