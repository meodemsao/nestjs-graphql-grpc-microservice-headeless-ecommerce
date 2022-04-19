import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ConfigSetting, ConfigSettings } from '@vg/proto-schema'
import { GetConfigSettingsQuery } from '@vg/service-config/modules/configSetting/queries'
import { ConfigSettingService } from '@vg/service-config/modules/configSetting/configSetting.service'

@QueryHandler(GetConfigSettingsQuery)
export class GetConfigSettingsHandler implements IQueryHandler<GetConfigSettingsQuery> {
  constructor(private readonly service: ConfigSettingService) {}

  async execute(data: GetConfigSettingsQuery): Promise<ConfigSettings> {
    try {
      const result = await this.service.find(
        this.service.fromQueryGrpcToTypeorm(data?.query)
      )

      return {
        configSettings: result as ConfigSetting[]
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
