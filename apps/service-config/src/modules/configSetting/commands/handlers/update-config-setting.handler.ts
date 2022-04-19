import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ConfigSetting } from '@vg/proto-schema'
import { UpdateConfigSettingCommand } from '@vg/service-config/modules/configSetting/commands'
import { ConfigSettingService } from '@vg/service-config/modules/configSetting/configSetting.service'

@CommandHandler(UpdateConfigSettingCommand)
export class UpdateConfigSettingHandler implements ICommandHandler<UpdateConfigSettingCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ConfigSettingService
  ) {}

  async execute(command: UpdateConfigSettingCommand): Promise<ConfigSetting> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as ConfigSetting
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
