import { IEvent } from '@nestjs/cqrs';
import { CategoryEntity } from '@vg/repository/entities'

export class CategoryCreatedEvent implements IEvent {
	constructor(public readonly category: CategoryEntity) {}
}
