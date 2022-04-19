import { Global, Module } from '@nestjs/common'
import {
  CartRpcClientService,
  CatalogRpcClientService, DiscountRpcClientService,
  InventoryRpcClientService
} from '@vg/core'
import { ConfigRpcClientService } from '@vg/core/services/grpc-clients/config-rpc-client.service'

@Global()
@Module({
  providers: [
    CatalogRpcClientService,
    CartRpcClientService,
    InventoryRpcClientService,
    DiscountRpcClientService,
    ConfigRpcClientService
  ],
  exports: [
    CatalogRpcClientService,
    CartRpcClientService,
    InventoryRpcClientService,
    DiscountRpcClientService,
    ConfigRpcClientService
  ]
})
export class GlobalClientModule {
}
