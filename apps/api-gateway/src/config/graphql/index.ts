import { Injectable, Logger } from '@nestjs/common'
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql'
//import depthLimit from 'graphql-depth-limit'
//import { MockList } from 'graphql-tools';

import { IS_PROD } from '@vg/core/constants/enviroment.constant'

import {
  END_POINT,
  GRAPHQL_DEPTH_LIMIT,
  IS_PLAYGROUND
} from '@vg/core/constants/application.constant'

// import {getUserFromRequest} from 'extensions/jwt'

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      autoSchemaFile: 'apps/api-gateway/src/schema.gql',
      //resolvers: { JSON: GraphQLJSON },
      //extensions: [() => new MyErrorTrackingExtension()],
      // mocks
      // mocks: NODE_ENV === 'testing' && {
      //   Query: () => ({
      //     users: () => new MockList([2, 6])
      //   })
      // },
      // resolverValidationOptions: {
      //   requireResolversForResolveType: false
      // },
      // path
      path: `${END_POINT!}`,
      debug: true,
      // cors
      // cors:
      //   NODE_ENV === 'production'
      //     ? {
      //       origin: FRONTEND_URL!,
      //       credentials: true // <-- REQUIRED backend setting
      //     }
      //     : true,
      cors: true,
      // body parser config
      bodyParserConfig: { limit: '50mb' },
      onHealthCheck: () => {
        return new Promise<void>((resolve, reject) => {
          // Replace the `true` in this conditional with more specific checks!
          resolve()
        })
      },
      // validationRules: [
      //   depthLimit(
      //     GRAPHQL_DEPTH_LIMIT!,
      //     { ignore: [/_trusted$/, 'idontcare'] },
      //     (depths) => {
      //       if (depths[''] === GRAPHQL_DEPTH_LIMIT! - 1) {
      //         Logger.warn(
      //           `⚠️  You can only descend ${GRAPHQL_DEPTH_LIMIT!} levels.`,
      //           'GraphQL',
      //           false
      //         )
      //       }
      //     }
      //   )
      // ],
      introspection: true,
      //playground: IS_PLAYGROUND,
      //tracing: !IS_PROD,
      // cacheControl: IS_PROD && {
      //   defaultMaxAge: 5,
      //   stripFormattedExtensions: false,
      //   calculateHttpHeaders: false
      // },
      // plugins: [responseCachePlugin()],
      context: async ({ req, res, connection }) => {
        // const user = getUserFromRequest(req)

        return {
          req,
          res
          // user
          // pubsub,
          // currentUser,
        }
      },
      // persistedQueries: {
      // 	cache: new MemcachedCache(
      // 		['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
      // 		{ retries: 10, retry: 10000 } // Options
      // 	)
      // },
      installSubscriptionHandlers: true,
      // uploads: {
      //   maxFiles: 5
      // }
    }
  }
}
