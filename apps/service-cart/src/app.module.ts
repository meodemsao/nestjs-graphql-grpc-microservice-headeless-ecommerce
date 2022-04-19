import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoreModule, ServiceRegistryModule } from '@vg/core'

import { DatabaseConfig } from '@vg/core/services/configs/database.config'
import { APP_GUARD } from '@nestjs/core'
import { AuthGrpcGuard } from '@vg/common/guard/auth-grpc.guard'
import { OrderModule } from '@vg/service-cart/modules/order/order.module'
import { OrderItemModule } from '@vg/service-cart/modules/orderItem/orderItem.module'

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig
    }),
    OrderModule,
    OrderItemModule
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
