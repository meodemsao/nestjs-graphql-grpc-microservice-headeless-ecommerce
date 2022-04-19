import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { OrderItem } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteOrderItemCommand } from '@vg/service-cart/modules/orderItem/commands'
import { OrderItemService } from '@vg/service-cart/modules/orderItem/orderItem.service'

@CommandHandler(DeleteOrderItemCommand)
export class DeleteOrderItemHandler
  implements ICommandHandler<DeleteOrderItemCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: OrderItemService
  ) {}

  async execute(command: DeleteOrderItemCommand): Promise<OrderItem> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as OrderItem
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
