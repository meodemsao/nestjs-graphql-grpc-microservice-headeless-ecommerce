import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DiscountManufacturer } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteDiscountManufacturerCommand } from '../index'
import { DiscountManufacturerService } from '../../discountManufacturer.service'

@CommandHandler(DeleteDiscountManufacturerCommand)
export class DeleteDiscountManufacturerHandler
  implements ICommandHandler<DeleteDiscountManufacturerCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountManufacturerService
  ) {}

  async execute(
    command: DeleteDiscountManufacturerCommand
  ): Promise<DiscountManufacturer> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as DiscountManufacturer
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
