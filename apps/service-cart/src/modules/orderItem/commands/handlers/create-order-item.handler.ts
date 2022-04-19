import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { OrderItem } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateOrderItemCommand } from '@vg/service-cart/modules/orderItem/commands'
import { OrderItemService } from '@vg/service-cart/modules/orderItem/orderItem.service'

@CommandHandler(CreateOrderItemCommand)
export class CreateOrderItemHandler
  implements ICommandHandler<CreateOrderItemCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: OrderItemService
  ) {}

  async execute(command: CreateOrderItemCommand): Promise<OrderItem> {
    this.logger.log(`execute create orderItem command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as OrderItem
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
