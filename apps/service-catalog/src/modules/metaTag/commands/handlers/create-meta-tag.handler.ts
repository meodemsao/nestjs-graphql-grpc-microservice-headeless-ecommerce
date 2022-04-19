import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { MetaTag } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateMetaTagCommand } from '@vg/service-catalog/modules/metaTag/commands'
import { MetaTagService } from '@vg/service-catalog/modules/metaTag/metaTag.service'

@CommandHandler(CreateMetaTagCommand)
export class CreateMetaTagHandler
  implements ICommandHandler<CreateMetaTagCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: MetaTagService
  ) {}

  async execute(command: CreateMetaTagCommand): Promise<MetaTag> {
    this.logger.log(`execute create attribute option command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as MetaTag
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
