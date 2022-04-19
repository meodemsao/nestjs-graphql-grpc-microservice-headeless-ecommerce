import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { LocationService } from '@vg/service-inventory/modules/location/location.service'
import { Location } from '@vg/proto-schema'
import { UpdateLocationCommand } from '@vg/service-inventory/modules/location/commands'

@CommandHandler(UpdateLocationCommand)
export class UpdateLocationHandler
  implements ICommandHandler<UpdateLocationCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: LocationService
  ) {}

  async execute(command: UpdateLocationCommand): Promise<Location> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as Location
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
