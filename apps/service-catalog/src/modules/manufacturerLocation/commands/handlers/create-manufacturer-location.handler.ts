import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ManufacturerLocation } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateManufacturerLocationCommand } from '@vg/service-catalog/modules/manufacturerLocation/commands'
import { ManufacturerLocationService } from '@vg/service-catalog/modules/manufacturerLocation/manufacturerLocation.service'

@CommandHandler(CreateManufacturerLocationCommand)
export class CreateManufacturerLocationHandler implements ICommandHandler<CreateManufacturerLocationCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ManufacturerLocationService
  ) {
  }

  async execute(command: CreateManufacturerLocationCommand): Promise<ManufacturerLocation> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ManufacturerLocation
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
