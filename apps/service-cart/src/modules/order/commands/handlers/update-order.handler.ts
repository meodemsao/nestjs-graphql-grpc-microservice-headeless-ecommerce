import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { OrderService } from '@vg/service-cart/modules/order/order.service'
import { Order } from '@vg/proto-schema'
import { UpdateOrderCommand } from '@vg/service-cart/modules/order/commands'

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: OrderService
  ) {}

  async execute(command: UpdateOrderCommand): Promise<Order> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as Order
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
