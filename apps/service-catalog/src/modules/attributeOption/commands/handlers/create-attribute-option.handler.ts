import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { AttributeOption } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateAttributeOptionCommand } from '@vg/service-catalog/modules/attributeOption/commands'
import { AttributeOptionService } from '@vg/service-catalog/modules/attributeOption/attributeOption.service'

@CommandHandler(CreateAttributeOptionCommand)
export class CreateAttributeOptionHandler
  implements ICommandHandler<CreateAttributeOptionCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: AttributeOptionService
  ) {}

  async execute(
    command: CreateAttributeOptionCommand
  ): Promise<AttributeOption> {
    this.logger.log(`execute create attribute option command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as AttributeOption
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
