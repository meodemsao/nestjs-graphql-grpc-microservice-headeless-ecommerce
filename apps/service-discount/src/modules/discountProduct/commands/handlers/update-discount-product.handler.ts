import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { DiscountProductService } from '../../discountProduct.service'
import { DiscountProduct } from '@vg/proto-schema'
import { UpdateDiscountProductCommand } from '../index'

@CommandHandler(UpdateDiscountProductCommand)
export class UpdateDiscountProductHandler
  implements ICommandHandler<UpdateDiscountProductCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountProductService
  ) {}

  async execute(
    command: UpdateDiscountProductCommand
  ): Promise<DiscountProduct> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as DiscountProduct
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
