import { Module } from '@nestjs/common'
import {
	EventStoreSubscriptionType,
	EventStoreModule
} from '@juicycleff/nest-event-store'
import {
	CategoryCreatedEvent
} from '@vg/event'
import { CategorySagas } from './sagas'

@Module({
	imports: [
		EventStoreModule.registerFeature({
			type: 'event-store',
			featureStreamName: '$ce-notication',
			subscriptions: [
				{
					type: EventStoreSubscriptionType.Volatile,
					stream: '$ce-category'
				}
			],
			eventHandlers: {
				CategoryCreatedEvent: (data) => new CategoryCreatedEvent(data)
			}
		})
	],
	providers: [CategorySagas]
})
export class EmailModule {
}
