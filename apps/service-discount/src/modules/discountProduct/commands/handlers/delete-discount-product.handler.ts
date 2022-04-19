import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DiscountProduct } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteDiscountProductCommand } from '../index'
import { DiscountProductService } from '../../discountProduct.service'

@CommandHandler(DeleteDiscountProductCommand)
export class DeleteDiscountProductHandler
  implements ICommandHandler<DeleteDiscountProductCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountProductService
  ) {}

  async execute(
    command: DeleteDiscountProductCommand
  ): Promise<DiscountProduct> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as DiscountProduct
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
