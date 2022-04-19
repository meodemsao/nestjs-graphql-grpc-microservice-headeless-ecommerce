import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { AttributeOption } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteAttributeOptionCommand } from '@vg/service-catalog/modules/attributeOption/commands'
import { AttributeOptionService } from '@vg/service-catalog/modules/attributeOption/attributeOption.service'

@CommandHandler(DeleteAttributeOptionCommand)
export class DeleteAttributeOptionHandler
  implements ICommandHandler<DeleteAttributeOptionCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: AttributeOptionService
  ) {}

  async execute(
    command: DeleteAttributeOptionCommand
  ): Promise<AttributeOption> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as AttributeOption
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
