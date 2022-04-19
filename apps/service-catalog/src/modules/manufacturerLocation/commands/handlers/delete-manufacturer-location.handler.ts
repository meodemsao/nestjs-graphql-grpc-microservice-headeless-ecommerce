import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ManufacturerLocation } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteManufacturerLocationCommand } from '@vg/service-catalog/modules/manufacturerLocation/commands'
import { ManufacturerLocationService } from '@vg/service-catalog/modules/manufacturerLocation/manufacturerLocation.service'

@CommandHandler(DeleteManufacturerLocationCommand)
export class DeleteManufacturerLocationHandler implements ICommandHandler<DeleteManufacturerLocationCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ManufacturerLocationService
  ) {
  }

  async execute(command: DeleteManufacturerLocationCommand): Promise<ManufacturerLocation> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ManufacturerLocation
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
