import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductLocation } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateProductLocationCommand } from '@vg/service-catalog/modules/productLocation/commands'
import { ProductLocationService } from '@vg/service-catalog/modules/productLocation/productLocation.service'

@CommandHandler(CreateProductLocationCommand)
export class CreateProductLocationHandler implements ICommandHandler<CreateProductLocationCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductLocationService
  ) {
  }

  async execute(command: CreateProductLocationCommand): Promise<ProductLocation> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ProductLocation
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
