import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { DiscountService } from '../../discount.service'
import { Discount } from '@vg/proto-schema'
import { UpdateDiscountCommand } from '../index'

@CommandHandler(UpdateDiscountCommand)
export class UpdateDiscountHandler
  implements ICommandHandler<UpdateDiscountCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountService
  ) {}

  async execute(command: UpdateDiscountCommand): Promise<Discount> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as Discount
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
