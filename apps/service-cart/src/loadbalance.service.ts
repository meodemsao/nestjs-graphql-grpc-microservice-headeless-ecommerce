import { Injectable } from '@nestjs/common'
import { InjectLoadbalance, Loadbalance, ServiceNotExistException } from '@nestcloud/loadbalance'
import { IServer } from '@nestcloud/common'

@Injectable()
export class LoadbalanceService {
	constructor(
		@InjectLoadbalance() private readonly lb: Loadbalance
	) {
	}

	chooseYourServiceNode() {
		try {
			const node: IServer = this.lb.choose('io.vg.srv.cart')
			if (!node) {
				console.log('No available node')
			}
		} catch (e) {
			if (e instanceof ServiceNotExistException) {
				console.log('this service is not exist')
			}
		}

	}
}
