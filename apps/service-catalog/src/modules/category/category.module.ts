import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import {
	EventStoreModule,
	EventStoreSubscriptionType
} from '@juicycleff/nest-event-store'

import { CategoryController } from './category.controller'
import { CategoryRepository } from '@vg/repository/repositories'
import { CategoryService } from '@vg/service-catalog/modules/category/category.service'
import { CommandHandlers } from '@vg/service-catalog/modules/category/commands'
import { QueryHandlers } from '@vg/service-catalog/modules/category/queries'

// event
import {
	CategoryCreatedEvent
} from '@vg/event'

@Module({
	imports: [
		TypeOrmModule.forFeature([CategoryRepository]),
		EventStoreModule.registerFeature({
			type: 'event-store',
			featureStreamName: '$ce-category',
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
	controllers: [CategoryController],
	providers: [
		CategoryService,
		...CommandHandlers,
		...QueryHandlers
	]
})

export class CategoryModule {
}
