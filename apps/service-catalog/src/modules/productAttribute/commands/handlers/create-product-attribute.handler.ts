import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductAttribute } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateProductAttributeCommand } from '@vg/service-catalog/modules/productAttribute/commands'
import { ProductAttributeService } from '@vg/service-catalog/modules/productAttribute/productAttribute.service'

@CommandHandler(CreateProductAttributeCommand)
export class CreateProductAttributeHandler implements ICommandHandler<CreateProductAttributeCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductAttributeService
  ) {
  }

  async execute(command: CreateProductAttributeCommand): Promise<ProductAttribute> {
    this.logger.log(`execute create catalog command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ProductAttribute
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
