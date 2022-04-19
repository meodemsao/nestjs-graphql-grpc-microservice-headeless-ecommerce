import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { AttributeOptionService } from '@vg/service-catalog/modules/attributeOption/attributeOption.service'
import { AttributeOption } from '@vg/proto-schema'
import { UpdateAttributeOptionCommand } from '@vg/service-catalog/modules/attributeOption/commands'

@CommandHandler(UpdateAttributeOptionCommand)
export class UpdateAttributeOptionHandler
  implements ICommandHandler<UpdateAttributeOptionCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: AttributeOptionService
  ) {}

  async execute(
    command: UpdateAttributeOptionCommand
  ): Promise<AttributeOption> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as AttributeOption
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
