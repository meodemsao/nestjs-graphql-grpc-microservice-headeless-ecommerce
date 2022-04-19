import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DiscountProduct } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateDiscountProductCommand } from '../index'
import { DiscountProductService } from '../../discountProduct.service'

@CommandHandler(CreateDiscountProductCommand)
export class CreateDiscountProductHandler
  implements ICommandHandler<CreateDiscountProductCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountProductService
  ) {}

  async execute(
    command: CreateDiscountProductCommand
  ): Promise<DiscountProduct> {
    this.logger.log(`execute create discountProduct command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as DiscountProduct
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
