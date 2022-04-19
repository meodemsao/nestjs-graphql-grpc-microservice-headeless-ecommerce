import { Injectable } from '@nestjs/common'
import {
	EventStoreOptionsFactory,
	EventStoreModuleOptions
} from '@juicycleff/nest-event-store'
import { ConsulEventstoreConfig } from '@vg/common'
import { Boot, InjectBoot } from '@nestcloud/boot'

@Injectable()
export class EventstoreConfigService implements EventStoreOptionsFactory {
	constructor(@InjectBoot() private readonly boot: Boot) {
	}

	createEventStoreOptions(
		connectionName?: string
	): EventStoreModuleOptions | Promise<EventStoreModuleOptions> {
		const eventstore = this.boot.get<ConsulEventstoreConfig>('eventstore')

		return {
			type: 'event-store',
			tcpEndpoint: {
				host: eventstore?.hostname,
				port: eventstore?.tcpPort
			},
			options: {
				maxRetries: 1000,
				maxReconnections: 1000,
				reconnectionDelay: 1000,
				heartbeatInterval: 1000,
				heartbeatTimeout: 1000,
				defaultUserCredentials: {
					password: eventstore?.tcpPassword,
					username: eventstore?.tcpUsername
				}
			}
		}
	}
}
