import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { ServiceRegistryModule } from '@vg/core'
import { GlobalClientModule } from './common/global-client.module'

//modules
import { CoreModule } from '@vg/core/modules/core.module'
import { CategoryModule } from '@vg/api-gateway/modules/category/category.module'
import { GqlConfigService } from '@vg/api-gateway/gql-config.service'
import { ProductModule } from '@vg/api-gateway/modules/product/product.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'nest-keycloak-connect'
import { CustomResourceGuard } from '@vg/common/guard/custom-resource.guard'
import { CategoryLocationModule } from '@vg/api-gateway/modules/categoryLocation/categoryLocation.module'
import { CategoryStoreModule } from '@vg/api-gateway/modules/categoryStore/categoryStore.module'
import { CollectionModule } from '@vg/api-gateway/modules/collection/collection.module'
import { CollectionLocationModule } from '@vg/api-gateway/modules/collectionLocation/collectionLocation.module'
import { CollectionStoreModule } from '@vg/api-gateway/modules/collectionStore/collectionStore.module'
import { AttributeOptionModule } from '@vg/api-gateway/modules/attributeOption/attributeOption.module'
import { ManufacturerModule } from '@vg/api-gateway/modules/manufacturer/manufacturer.module'
import { ManufacturerLocationModule } from '@vg/api-gateway/modules/manufacturerLocation/manufacturerLocation.module'
import { ManufacturerStoreModule } from '@vg/api-gateway/modules/manufacturerStore/manufacturerStore.module'
import { AttributeModule } from '@vg/api-gateway/modules/attribute/attribute.module'
import { ImportPriceHistoryModule } from '@vg/api-gateway/modules/importPriceHistory/importPriceHistory.module'
import { ProductImageModule } from '@vg/api-gateway/modules/productImage/productImage.module'
import { ProductVariantPriceModule } from '@vg/api-gateway/modules/productVariantPrice/productVariantPrice.module'
import { ProductVariantUsageHistoryModule } from '@vg/api-gateway/modules/productVariantUsageHistory/productVariantUsageHistory.module'
import { ProductVariantAvailabilityModule } from '@vg/api-gateway/modules/productVariantAvailability/productVariantAvailability.module'
import { ProductAttributeModule } from '@vg/api-gateway/modules/productAttribute/productAttribute.module'
import { ProductVariantAttributeModule } from '@vg/api-gateway/modules/productVariantAttribute/productVariantAttribute.module'
import { ProductCategoryModule } from '@vg/api-gateway/modules/productCategory/productCategory.module'
import { ProductCollectionModule } from '@vg/api-gateway/modules/productCollection/productCollection.module'
import { ProductLocationModule } from '@vg/api-gateway/modules/productLocation/productLocation.module'
import { ProductStoreModule } from '@vg/api-gateway/modules/productStore/productStore.module'
import { MetaTagModule } from '@vg/api-gateway/modules/metaTag/metaTag.module'
import { TemplateModule } from '@vg/api-gateway/modules/template/template.module'
import { TagModule } from '@vg/api-gateway/modules/tag/tag.module'
import { OrderModule } from '@vg/api-gateway/modules/order/order.module'
import { OrderItemModule } from '@vg/api-gateway/modules/orderItem/orderItem.module'
import { DiscountModule } from '@vg/api-gateway/modules/discount/discount.module'
import { DiscountCategoryModule } from '@vg/api-gateway/modules/discountCategory/discountCategory.module'
import { DiscountProductModule } from '@vg/api-gateway/modules/discountProduct/discountProduct.module'
import { DiscountManufacturerModule } from '@vg/api-gateway/modules/discountManufacturer/discountManufacturer.module'
import { DiscountRequirementModule } from '@vg/api-gateway/modules/discountRequirement/discountRequirement.module'
import { DiscountUsageHistoryModule } from '@vg/api-gateway/modules/discountUsageHistory/discountUsageHistory.module'
import { StoreModule } from '@vg/api-gateway/modules/store/store.module'
import { LocationModule } from '@vg/api-gateway/modules/location/location.module'
import { ConfigSettingModule } from '@vg/api-gateway/modules/configSetting/configSetting.module'

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService
    }),
    GlobalClientModule,
    // Category
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
    ProductModule,
    ProductImageModule,
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
    ProductVariantAttributeModule,
    MetaTagModule,
    TemplateModule,
    TagModule,

    // Cart Module
    OrderModule,
    OrderItemModule,

    // Discount
    DiscountModule,
    DiscountCategoryModule,
    DiscountProductModule,
    DiscountManufacturerModule,
    DiscountRequirementModule,
    DiscountUsageHistoryModule,

    // Inventory
    StoreModule,
    LocationModule,

    // Config
    ConfigSettingModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: CustomResourceGuard
    }
  ]
})
export class AppModule {}
