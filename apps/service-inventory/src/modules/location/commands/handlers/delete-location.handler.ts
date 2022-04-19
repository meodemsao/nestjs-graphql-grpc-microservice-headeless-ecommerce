import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Location } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteLocationCommand } from '@vg/service-inventory/modules/location/commands'
import { LocationService } from '@vg/service-inventory/modules/location/location.service'

@CommandHandler(DeleteLocationCommand)
export class DeleteLocationHandler
  implements ICommandHandler<DeleteLocationCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: LocationService
  ) {}

  async execute(command: DeleteLocationCommand): Promise<Location> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as Location
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
