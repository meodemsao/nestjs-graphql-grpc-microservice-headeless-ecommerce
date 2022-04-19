import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Attribute } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteAttributeCommand } from '@vg/service-catalog/modules/attribute/commands'
import { AttributeService } from '@vg/service-catalog/modules/attribute/attribute.service'

@CommandHandler(DeleteAttributeCommand)
export class DeleteAttributeHandler
  implements ICommandHandler<DeleteAttributeCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: AttributeService
  ) {}

  async execute(command: DeleteAttributeCommand): Promise<Attribute> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as Attribute
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
