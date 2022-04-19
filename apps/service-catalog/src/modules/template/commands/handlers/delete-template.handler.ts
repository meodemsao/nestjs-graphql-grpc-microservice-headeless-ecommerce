import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Template } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteTemplateCommand } from '@vg/service-catalog/modules/template/commands'
import { TemplateService } from '@vg/service-catalog/modules/template/template.service'

@CommandHandler(DeleteTemplateCommand)
export class DeleteTemplateHandler implements ICommandHandler<DeleteTemplateCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: TemplateService
  ) {
  }

  async execute(command: DeleteTemplateCommand): Promise<Template> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as Template
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
