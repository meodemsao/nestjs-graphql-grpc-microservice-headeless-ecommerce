const baseUrl = process.cwd() + '/dist/libs/proto-schema/'

export const SERVICE_LIST = {
  catalog: {
    package: 'io.vg.srv.catalog',
    consulName: 'io.vg.srv.catalog',
    service: 'CatalogService',
    protoPath: baseUrl + 'proto/catalog.service.proto',
    url: 'localhost:50051'
  },
  cart: {
    package: 'io.vg.srv.cart',
    consulName: 'io.vg.srv.cart',
    service: 'CartService',
    protoPath: baseUrl + 'proto/cart.service.proto',
    url: 'localhost:50052'
  },
  inventory: {
    package: 'io.vg.srv.inventory',
    consulName: 'io.vg.srv.inventory',
    service: 'InventoryService',
    protoPath: baseUrl + 'proto/inventory.service.proto',
    url: 'localhost:50053'
  },
  discount: {
    package: 'io.vg.srv.discount',
    consulName: 'io.vg.srv.discount',
    service: 'DiscountService',
    protoPath: baseUrl + 'proto/discount.service.proto',
    url: 'localhost:50054'
  },
  config: {
    package: 'io.vg.srv.config',
    consulName: 'io.vg.srv.config',
    service: 'ConfigService',
    protoPath: baseUrl + 'proto/config.service.proto',
    url: 'localhost:50055'
  }
}
