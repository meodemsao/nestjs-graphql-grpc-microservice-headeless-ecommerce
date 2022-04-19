import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoreModule, ServiceRegistryModule } from '@vg/core'

import { DatabaseConfig } from '@vg/core/services/configs/database.config'
import { APP_GUARD } from '@nestjs/core'
import { ProductModule } from '@vg/service-catalog/modules/product/product.module'
import { CategoryModule } from '@vg/service-catalog/modules/category/category.module'
import { AuthGrpcGuard } from '@vg/common/guard/auth-grpc.guard'
import { CategoryLocationModule } from '@vg/service-catalog/modules/categoryLocation/categoryLocation.module'
import { CategoryStoreModule } from '@vg/service-catalog/modules/categoryStore/categoryStore.module'
import { CollectionModule } from '@vg/service-catalog/modules/collection/collection.module'
import { CollectionLocationModule } from '@vg/service-catalog/modules/collectionLocation/collectionLocation.module'
import { CollectionStoreModule } from '@vg/service-catalog/modules/collectionStore/collectionStore.module'
import { ManufacturerModule } from '@vg/service-catalog/modules/manufacturer/manufacturer.module'
import { ManufacturerLocationModule } from '@vg/service-catalog/modules/manufacturerLocation/manufacturerLocation.module'
import { ManufacturerStoreModule } from '@vg/service-catalog/modules/manufacturerStore/manufacturerStore.module'
import { AttributeModule } from '@vg/service-catalog/modules/attribute/attribute.module'
import { AttributeOptionModule } from '@vg/service-catalog/modules/attributeOption/attributeOption.module'
import { ImportPriceHistoryModule } from '@vg/service-catalog/modules/importPriceHistory/importPriceHistory.module'
import { ProductImageModule } from '@vg/service-catalog/modules/productImage/productImage.module'

import { ProductVariantPriceModule } from '@vg/service-catalog/modules/productVariantPrice/productVariantPrice.module'
import { ProductVariantUsageHistoryModule } from '@vg/service-catalog/modules/productVariantUsageHistory/productVariantUsageHistory.module'
import { ProductVariantAvailabilityModule } from '@vg/service-catalog/modules/productVariantAvailability/productVariantAvailability.module'
import { ProductAttributeModule } from '@vg/service-catalog/modules/productAttribute/productAttribute.module'
import { ProductVariantAttributeModule } from '@vg/service-catalog/modules/productVariantAttribute/productVariantAttribute.module'
import { ProductCategoryModule } from '@vg/service-catalog/modules/productCategory/productCategory.module'
import { ProductCollectionModule } from '@vg/service-catalog/modules/productCollection/productCollection.module'
import { ProductLocationModule } from '@vg/service-catalog/modules/productLocation/productLocation.module'
import { ProductStoreModule } from '@vg/service-catalog/modules/productStore/productStore.module'
import { ProductVariantModule } from '@vg/service-catalog/modules/productVariant/productVariant.module'
import { MetaTagModule } from '@vg/service-catalog/modules/metaTag/metaTag.module'
import { TemplateModule } from '@vg/service-catalog/modules/template/template.module'
import { TagModule } from '@vg/service-catalog/modules/tag/tag.module'

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig
    }),

    CategoryModule,
    CategoryLocationModule,
    CategoryStoreModule,
    CollectionModule,
    CollectionLocationModule,
    CollectionStoreModule,

    ManufacturerModule,
    ManufacturerLocationModule,
    ManufacturerStoreModule,
    ProductVariantAvailabilityModule,
    ProductVariantModule,
    ProductModule,
    ProductImageModule,
    ProductVariantAttributeModule,
    ProductAttributeModule,
    ProductCategoryModule,
    ProductCollectionModule,
    ProductLocationModule,
    ProductStoreModule,
    ProductVariantUsageHistoryModule,
    ProductVariantPriceModule,
    ImportPriceHistoryModule,
    AttributeModule,
    AttributeOptionModule,
    MetaTagModule,
    TemplateModule,
    TagModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGrpcGuard
    }
  ]
})
export class AppModule {}
