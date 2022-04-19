import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Attribute } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateAttributeCommand } from '@vg/service-catalog/modules/attribute/commands'
import { AttributeService } from '@vg/service-catalog/modules/attribute/attribute.service'

@CommandHandler(CreateAttributeCommand)
export class CreateAttributeHandler
  implements ICommandHandler<CreateAttributeCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: AttributeService
  ) {}

  async execute(command: CreateAttributeCommand): Promise<Attribute> {
    this.logger.log(`execute create attribute command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as Attribute
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
