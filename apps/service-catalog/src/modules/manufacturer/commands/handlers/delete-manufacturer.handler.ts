import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Manufacturer } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteManufacturerCommand } from '@vg/service-catalog/modules/manufacturer/commands'
import { ManufacturerService } from '@vg/service-catalog/modules/manufacturer/manufacturer.service'

@CommandHandler(DeleteManufacturerCommand)
export class DeleteManufacturerHandler implements ICommandHandler<DeleteManufacturerCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ManufacturerService
  ) {
  }

  async execute(command: DeleteManufacturerCommand): Promise<Manufacturer> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as Manufacturer
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
