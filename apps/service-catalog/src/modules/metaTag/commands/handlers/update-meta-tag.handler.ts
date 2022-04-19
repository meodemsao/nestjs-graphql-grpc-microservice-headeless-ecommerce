import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { MetaTagService } from '@vg/service-catalog/modules/metaTag/metaTag.service'
import { MetaTag } from '@vg/proto-schema'
import { UpdateMetaTagCommand } from '@vg/service-catalog/modules/metaTag/commands'

@CommandHandler(UpdateMetaTagCommand)
export class UpdateMetaTagHandler
  implements ICommandHandler<UpdateMetaTagCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: MetaTagService
  ) {}

  async execute(command: UpdateMetaTagCommand): Promise<MetaTag> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as MetaTag
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
