import {
  CartRpcClientService,
  CatalogRpcClientService, DiscountRpcClientService,
  InventoryRpcClientService
} from '@vg/core/services'
import { Context } from 'apollo-server-core/src/types'
import { ConfigRpcClientService } from '@vg/core/services/grpc-clients/config-rpc-client.service'

export interface GqlContext extends Partial<Context> {
  connection?: any
  rpc: {
    catalog: CatalogRpcClientService
    cart: CartRpcClientService
    inventory: InventoryRpcClientService,
    discount: DiscountRpcClientService,
    config: ConfigRpcClientService
  }
}
