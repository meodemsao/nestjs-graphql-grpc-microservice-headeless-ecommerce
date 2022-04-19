import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { MetaTag } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteMetaTagCommand } from '@vg/service-catalog/modules/metaTag/commands'
import { MetaTagService } from '@vg/service-catalog/modules/metaTag/metaTag.service'

@CommandHandler(DeleteMetaTagCommand)
export class DeleteMetaTagHandler
  implements ICommandHandler<DeleteMetaTagCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: MetaTagService
  ) {}

  async execute(command: DeleteMetaTagCommand): Promise<MetaTag> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as MetaTag
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
