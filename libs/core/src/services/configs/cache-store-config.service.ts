import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable
} from '@nestjs/common'
import { Boot, InjectBoot } from '@nestcloud/boot'
import redisStore from 'cache-manager-redis-store'
import * as redis from 'redis'
import { ConsulRedisConfig } from '@vg/common'

@Injectable()
export class CacheStoreConfigService implements CacheOptionsFactory {

  constructor(@InjectBoot() private readonly boot: Boot) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    const redis = this.boot.get<ConsulRedisConfig>('redis')
    const caching = this.boot.get<{ ttl: number; max: number }>('caching')
    return {
      store: redisStore,
      ttl: caching?.ttl, // seconds
      max: caching?.max, // maximum number of items in cache
      options: {
        ...redis
      }
    }
  }
}
