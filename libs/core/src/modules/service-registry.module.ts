import { resolve } from 'path'
import { CacheModule, Global, Module } from '@nestjs/common'
import { LoadbalanceModule } from '@nestcloud/loadbalance'
import { BOOT, CONSUL } from '@nestcloud/common'
import { ConfigModule } from '@nestcloud/config'
import { ScheduleModule } from '@nestcloud/schedule'
import { ConsulModule } from '@nestcloud/consul'
import { BootModule } from '@nestcloud/boot'
import { ServiceModule } from '@nestcloud/service'
import { LoggerModule } from '@nestcloud/logger'
import { EventStoreModule } from '@juicycleff/nest-event-store'
import { TerminusModule } from '@nestjs/terminus'

import { EventstoreConfigService } from '../services'
import { GrpcModule } from '@nestcloud/grpc'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfig } from '@vg/core/services/configs/database.config'

@Global()
@Module({
	imports: [
		LoggerModule.forRoot(),
		ScheduleModule.forRoot(),
		BootModule.forRoot({
			filePath: resolve(__dirname,`bootstrap-${process.env.NODE_ENV || 'development'}.yaml`)
		}),
		ConsulModule.forRootAsync({ inject: [BOOT] }),
		ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
		ConfigModule.forRootAsync({ inject: [BOOT, CONSUL] }),
		LoadbalanceModule.forRootAsync({ inject: [BOOT] }),
		GrpcModule.forRoot(),
		// CacheModule.registerAsync({
		// 	useClass: CacheStoreConfigService
		// }),
		EventStoreModule.registerAsync({
			type: 'event-store',
			useClass: EventstoreConfigService
		}),
		TerminusModule
	],
	exports: [
		LoggerModule.forRoot(),
		ScheduleModule.forRoot(),
		BootModule.forRoot({
			filePath: resolve(__dirname,`bootstrap-${process.env.NODE_ENV || 'development'}.yaml`)
		}),
		ConsulModule.forRootAsync({ inject: [BOOT] }),
		ServiceModule.forRootAsync({ inject: [BOOT, CONSUL] }),
		ConfigModule.forRootAsync({ inject: [BOOT, CONSUL] }),
		LoadbalanceModule.forRootAsync({ inject: [BOOT] }),
		GrpcModule.forRoot(),
		// CacheModule.registerAsync({
		// 	useClass: CacheStoreConfigService
		// }),
		EventStoreModule.registerAsync({
			type: 'event-store',
			useClass: EventstoreConfigService
		}),
		TerminusModule
	],
	providers: [
		DatabaseConfig
	]
})

export class ServiceRegistryModule {
}
