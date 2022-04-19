import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@vg/query-graphql'
import { ConfigSettingDto } from '@vg/api-gateway/modules/configSetting/dto/configSetting.dto'
import { ConfigSettingInputType } from '@vg/api-gateway/modules/configSetting/dto/configSetting.args'
import { ConfigSettingResolver } from '@vg/api-gateway/modules/configSetting/configSetting.resolver'

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature(
      {
        resolvers: [
          {
            DTOClass: ConfigSettingDto,
            CreateDTOClass: ConfigSettingInputType,
            UpdateDTOClass: ConfigSettingInputType
          }
        ]
      }
    )
  ],
  providers: [
    ConfigSettingResolver
  ]
})
export class ConfigSettingModule {
}
