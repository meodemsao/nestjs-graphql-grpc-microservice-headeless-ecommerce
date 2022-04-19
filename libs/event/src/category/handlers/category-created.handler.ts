import { Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { CategoryCreatedEvent } from '../impl'

@EventsHandler(CategoryCreatedEvent)
export class CategoryCreatedHandler implements IEventHandler<CategoryCreatedEvent> {
	handle(event: CategoryCreatedEvent): any {
		Logger.log(event, 'CategoryCreatedEvent')
	}
}
