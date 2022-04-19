import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Order } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateOrderCommand } from '@vg/service-cart/modules/order/commands'
import { OrderService } from '@vg/service-cart/modules/order/order.service'

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: OrderService
  ) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    this.logger.log(`execute create order command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as Order
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
