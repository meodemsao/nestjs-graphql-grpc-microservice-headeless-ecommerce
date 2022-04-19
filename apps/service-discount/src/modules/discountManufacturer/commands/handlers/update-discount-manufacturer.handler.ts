import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { DiscountManufacturerService } from '../../discountManufacturer.service'
import { DiscountManufacturer } from '@vg/proto-schema'
import { UpdateDiscountManufacturerCommand } from '../index'

@CommandHandler(UpdateDiscountManufacturerCommand)
export class UpdateDiscountManufacturerHandler
  implements ICommandHandler<UpdateDiscountManufacturerCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountManufacturerService
  ) {}

  async execute(
    command: UpdateDiscountManufacturerCommand
  ): Promise<DiscountManufacturer> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as DiscountManufacturer
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
