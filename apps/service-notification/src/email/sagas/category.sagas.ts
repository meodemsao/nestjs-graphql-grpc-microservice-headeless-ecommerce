import { Injectable, Logger } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'
import {
	CategoryCreatedEvent
} from '@vg/event'

@Injectable()
export class CategorySagas {
	logger = new Logger(this.constructor.name)

	// constructor(@InjectQueue('notification_queue') readonly queue: Queue) {}

	@Saga()
	userLoggedIn = (events$: Observable<any>): Observable<ICommand> => {
		return events$.pipe(
			ofType(CategoryCreatedEvent),
			delay(1000),
			map((event) => {
				this.logger.log('CategoryCreatedEvent..................', JSON.stringify(event.category))
				return null
			})
		)
	}
}
