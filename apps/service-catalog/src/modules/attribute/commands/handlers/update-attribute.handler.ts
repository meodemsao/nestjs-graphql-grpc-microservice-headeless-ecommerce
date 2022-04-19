import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { AttributeService } from '@vg/service-catalog/modules/attribute/attribute.service'
import { Attribute } from '@vg/proto-schema'
import { UpdateAttributeCommand } from '@vg/service-catalog/modules/attribute/commands'

@CommandHandler(UpdateAttributeCommand)
export class UpdateAttributeHandler
  implements ICommandHandler<UpdateAttributeCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: AttributeService
  ) {}

  async execute(command: UpdateAttributeCommand): Promise<Attribute> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as Attribute
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
