import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DiscountManufacturer } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateDiscountManufacturerCommand } from '../index'
import { DiscountManufacturerService } from '../../discountManufacturer.service'

@CommandHandler(CreateDiscountManufacturerCommand)
export class CreateDiscountManufacturerHandler
  implements ICommandHandler<CreateDiscountManufacturerCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountManufacturerService
  ) {}

  async execute(
    command: CreateDiscountManufacturerCommand
  ): Promise<DiscountManufacturer> {
    this.logger.log(`execute create discountManufacturer command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as DiscountManufacturer
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
