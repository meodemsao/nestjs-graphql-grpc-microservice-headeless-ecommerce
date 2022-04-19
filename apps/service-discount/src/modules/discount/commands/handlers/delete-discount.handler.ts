import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Discount } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteDiscountCommand } from '../index'
import { DiscountService } from '../../discount.service'

@CommandHandler(DeleteDiscountCommand)
export class DeleteDiscountHandler
  implements ICommandHandler<DeleteDiscountCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountService
  ) {}

  async execute(command: DeleteDiscountCommand): Promise<Discount> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as Discount
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
