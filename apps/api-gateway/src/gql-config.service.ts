import { Injectable } from '@nestjs/common'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
// import { RedisCache } from 'apollo-server-cache-redis'
import { corsApollOptions } from '@vg/common'
import { InjectConfig } from '@nestcloud/config'
import { ConsulConfig } from '@nestcloud/config/dist/config.consul'
import {
  CartRpcClientService,
  CatalogRpcClientService, DiscountRpcClientService,
  END_POINT,
  GqlContext,
  InventoryRpcClientService
} from '@vg/core'
import { ConfigRpcClientService } from '@vg/core/services/grpc-clients/config-rpc-client.service'

// import { RedisOptions } from 'ioredis'

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(
    @InjectConfig() private readonly config: ConsulConfig,
    private readonly catalog: CatalogRpcClientService,
    private readonly cart: CartRpcClientService,
    private readonly inventory: InventoryRpcClientService,
    private readonly discount: DiscountRpcClientService,
    private readonly setting: ConfigRpcClientService
  ) {
  }

  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    // /* Get redis config from consul */
    // const redisOptions = this.config.get<RedisOptions>('database.redis')
    //
    // /* initialize cache */
    // const cache = new RedisCache(redisOptions)

    return {
      autoSchemaFile: 'apps/api-gateway/src/schema.gql',
      path: `${END_POINT!}`,
      cors: corsApollOptions,
      debug: true,
      introspection: true,
      bodyParserConfig: { limit: '50mb' },
      context: ({ req, res, payload, connection }): GqlContext => {
        return {
          // @ts-ignore
          payload,
          connection,
          req,
          rpc: {
            catalog: this.catalog,
            cart: this.cart,
            inventory: this.inventory,
            discount: this.discount,
            config: this.setting
          }
        }
      },
      // cache,

      /**
       * Enable this at your own detriment. Without this, namespaced mutation won't work,
       * I have taken time to make sure resolvers guards are place in the right places.
       * While extending the application, be careful
       * Here is the reason https://github.com/nestjs/graphql/issues/295
       */
      fieldResolverEnhancers: ['guards', 'interceptors']
      // persistedQueries: {
      // 	cache
      // },
    }
  }
}
