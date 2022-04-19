import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Discount } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateDiscountCommand } from '@vg/service-discount/modules/discount/commands'
import { DiscountService } from '@vg/service-discount/modules/discount/discount.service'

@CommandHandler(CreateDiscountCommand)
export class CreateDiscountHandler
  implements ICommandHandler<CreateDiscountCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountService
  ) {}

  async execute(command: CreateDiscountCommand): Promise<Discount> {
    this.logger.log(`execute create discount command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as Discount
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
