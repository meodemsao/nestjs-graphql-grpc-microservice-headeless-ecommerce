import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoreModule, ServiceRegistryModule } from '@vg/core'

import { DatabaseConfig } from '@vg/core/services/configs/database.config'
import { APP_GUARD } from '@nestjs/core'
import { AuthGrpcGuard } from '@vg/common/guard/auth-grpc.guard'
import { DiscountModule } from '@vg/service-discount/modules/discount/discount.module'
import { DiscountCategoryModule } from '@vg/service-discount/modules/discountCategory/discountCategory.module'
import { DiscountManufacturerModule } from '@vg/service-discount/modules/discountManufacturer/discountManufacturer.module'
import { DiscountProductModule } from '@vg/service-discount/modules/discountProduct/discountProduct.module'
import { DiscountRequirementModule } from '@vg/service-discount/modules/discountRequirement/discountRequirement.module'
import { DiscountUsageHistoryModule } from '@vg/service-discount/modules/discountUsageHistory/discountUsageHistory.module'

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig
    }),
    DiscountModule,
    DiscountCategoryModule,
    DiscountManufacturerModule,
    DiscountProductModule,
    DiscountRequirementModule,
    DiscountUsageHistoryModule
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
