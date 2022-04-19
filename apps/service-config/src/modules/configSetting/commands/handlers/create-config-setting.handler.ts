import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ConfigSetting } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateConfigSettingCommand } from '@vg/service-config/modules/configSetting/commands'
import { ConfigSettingService } from '@vg/service-config/modules/configSetting/configSetting.service'

@CommandHandler(CreateConfigSettingCommand)
export class CreateConfigSettingHandler implements ICommandHandler<CreateConfigSettingCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ConfigSettingService
  ) {}

  async execute(command: CreateConfigSettingCommand): Promise<ConfigSetting> {
    this.logger.log(`execute create ConfigSetting command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ConfigSetting
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
