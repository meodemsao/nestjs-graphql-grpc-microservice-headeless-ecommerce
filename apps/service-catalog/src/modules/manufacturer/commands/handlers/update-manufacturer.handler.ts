import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ManufacturerService } from '@vg/service-catalog/modules/manufacturer/manufacturer.service'
import { Manufacturer } from '@vg/proto-schema'
import { UpdateManufacturerCommand } from '@vg/service-catalog/modules/manufacturer/commands'

@CommandHandler(UpdateManufacturerCommand)
export class UpdateManufacturerHandler implements ICommandHandler<UpdateManufacturerCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ManufacturerService
  ) {
  }

  async execute(command: UpdateManufacturerCommand): Promise<Manufacturer> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as Manufacturer
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
