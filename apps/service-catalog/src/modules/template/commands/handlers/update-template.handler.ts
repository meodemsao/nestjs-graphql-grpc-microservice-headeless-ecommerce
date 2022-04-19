import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { TemplateService } from '@vg/service-catalog/modules/template/template.service'
import { Template } from '@vg/proto-schema'
import { UpdateTemplateCommand } from '@vg/service-catalog/modules/template/commands'

@CommandHandler(UpdateTemplateCommand)
export class UpdateTemplateHandler implements ICommandHandler<UpdateTemplateCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: TemplateService
  ) {
  }

  async execute(command: UpdateTemplateCommand): Promise<Template> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as Template
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
