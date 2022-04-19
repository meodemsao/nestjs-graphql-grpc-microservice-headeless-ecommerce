import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Manufacturer } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateManufacturerCommand } from '@vg/service-catalog/modules/manufacturer/commands'
import { ManufacturerService } from '@vg/service-catalog/modules/manufacturer/manufacturer.service'

@CommandHandler(CreateManufacturerCommand)
export class CreateManufacturerHandler implements ICommandHandler<CreateManufacturerCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ManufacturerService
  ) {
  }

  async execute(command: CreateManufacturerCommand): Promise<Manufacturer> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as Manufacturer
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
