import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { ConfigSetting, NullableConfigSetting } from '@vg/proto-schema'
import { GetConfigSettingQuery } from '@vg/service-config/modules/configSetting/queries'
import { ConfigSettingService } from '@vg/service-config/modules/configSetting/configSetting.service'

@QueryHandler(GetConfigSettingQuery)
export class GetConfigSettingHandler implements IQueryHandler<GetConfigSettingQuery> {
  constructor(private readonly service: ConfigSettingService) {}

  async execute(query: GetConfigSettingQuery): Promise<NullableConfigSetting> {
    try {
      const result = await this.service.findById(query.id)

      return {
        data: result as ConfigSetting,
        null: result ? 0 : undefined
      }
    } catch (e) {
      console.log('e..........', e)
      throw new RpcException(e)
    }
  }
}
