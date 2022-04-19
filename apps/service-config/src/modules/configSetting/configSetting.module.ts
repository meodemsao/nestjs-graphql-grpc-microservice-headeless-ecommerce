import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ConfigSettingController } from './configSetting.controller'
import { ConfigSettingRepository } from '@vg/repository/repositories'
import { ConfigSettingService } from '@vg/service-config/modules/configSetting/configSetting.service'
import { CommandHandlers } from '@vg/service-config/modules/configSetting/commands'
import { QueryHandlers } from '@vg/service-config/modules/configSetting/queries'

@Module({
  imports: [TypeOrmModule.forFeature([ConfigSettingRepository])],
  controllers: [ConfigSettingController],
  providers: [ConfigSettingService, ...CommandHandlers, ...QueryHandlers]
})
export class ConfigSettingModule {
}
