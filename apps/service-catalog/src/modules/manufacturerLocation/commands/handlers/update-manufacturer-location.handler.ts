import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ManufacturerLocationService } from '@vg/service-catalog/modules/manufacturerLocation/manufacturerLocation.service'
import { ManufacturerLocation } from '@vg/proto-schema'
import { UpdateManufacturerLocationCommand } from '@vg/service-catalog/modules/manufacturerLocation/commands'

@CommandHandler(UpdateManufacturerLocationCommand)
export class UpdateManufacturerLocationHandler implements ICommandHandler<UpdateManufacturerLocationCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ManufacturerLocationService
  ) {
  }

  async execute(command: UpdateManufacturerLocationCommand): Promise<ManufacturerLocation> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as ManufacturerLocation
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
