import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Count } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { GetConfigSettingsTotalQuery } from '@vg/service-config/modules/configSetting/queries'
import { ConfigSettingService } from '@vg/service-config/modules/configSetting/configSetting.service'

@QueryHandler(GetConfigSettingsTotalQuery)
export class GetConfigSettingsTotalHandler
  implements IQueryHandler<GetConfigSettingsTotalQuery>
{
  constructor(private readonly service: ConfigSettingService) {}

  async execute(data: GetConfigSettingsTotalQuery): Promise<Count> {
    try {
      const result = await this.service.count(
        this.service.fromQueryGrpcToTypeorm(data?.query).filter
      )

      return {
        totalCount: result
      }
    } catch (e) {
      throw new RpcException(e)
    }
  }
}
