import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoreModule, ServiceRegistryModule } from '@vg/core'

import { DatabaseConfig } from '@vg/core/services/configs/database.config'
import { APP_GUARD } from '@nestjs/core'
import { AuthGrpcGuard } from '@vg/common/guard/auth-grpc.guard'
import { ConfigSettingModule } from '@vg/service-config/modules/configSetting/configSetting.module'

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig
    }),
    ConfigSettingModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGrpcGuard
    }
  ]
})
export class AppModule {
}
