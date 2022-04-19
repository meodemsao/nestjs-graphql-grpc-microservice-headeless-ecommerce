import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ConfigSetting } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteConfigSettingCommand } from '@vg/service-config/modules/configSetting/commands'
import { ConfigSettingService } from '@vg/service-config/modules/configSetting/configSetting.service'

@CommandHandler(DeleteConfigSettingCommand)
export class DeleteConfigSettingHandler implements ICommandHandler<DeleteConfigSettingCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ConfigSettingService
  ) {}

  async execute(command: DeleteConfigSettingCommand): Promise<ConfigSetting> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ConfigSetting
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
