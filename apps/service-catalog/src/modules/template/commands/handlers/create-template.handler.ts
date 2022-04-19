import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Template } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateTemplateCommand } from '@vg/service-catalog/modules/template/commands'
import { TemplateService } from '@vg/service-catalog/modules/template/template.service'

@CommandHandler(CreateTemplateCommand)
export class CreateTemplateHandler implements ICommandHandler<CreateTemplateCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: TemplateService
  ) {
  }

  async execute(command: CreateTemplateCommand): Promise<Template> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as Template
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
