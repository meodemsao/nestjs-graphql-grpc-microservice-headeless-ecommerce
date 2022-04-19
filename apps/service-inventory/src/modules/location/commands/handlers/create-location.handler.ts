import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Location } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateLocationCommand } from '@vg/service-inventory/modules/location/commands'
import { LocationService } from '@vg/service-inventory/modules/location/location.service'

@CommandHandler(CreateLocationCommand)
export class CreateLocationHandler
  implements ICommandHandler<CreateLocationCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: LocationService
  ) {}

  async execute(command: CreateLocationCommand): Promise<Location> {
    this.logger.log(`execute create location command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as Location
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
