import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { OrderItemService } from '@vg/service-cart/modules/orderItem/orderItem.service'
import { OrderItem } from '@vg/proto-schema'
import { UpdateOrderItemCommand } from '@vg/service-cart/modules/orderItem/commands'

@CommandHandler(UpdateOrderItemCommand)
export class UpdateOrderItemHandler
  implements ICommandHandler<UpdateOrderItemCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: OrderItemService
  ) {}

  async execute(command: UpdateOrderItemCommand): Promise<OrderItem> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as OrderItem
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
