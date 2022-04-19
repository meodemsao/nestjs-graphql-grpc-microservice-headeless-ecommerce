import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Order } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteOrderCommand } from '@vg/service-cart/modules/order/commands'
import { OrderService } from '@vg/service-cart/modules/order/order.service'

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: OrderService
  ) {}

  async execute(command: DeleteOrderCommand): Promise<Order> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as Order
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
