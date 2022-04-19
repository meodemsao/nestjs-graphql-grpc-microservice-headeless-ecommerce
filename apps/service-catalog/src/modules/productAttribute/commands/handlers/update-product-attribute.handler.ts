import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductAttributeService } from '@vg/service-catalog/modules/productAttribute/productAttribute.service'
import { ProductAttribute } from '@vg/proto-schema'
import { UpdateProductAttributeCommand } from '@vg/service-catalog/modules/productAttribute/commands'

@CommandHandler(UpdateProductAttributeCommand)
export class UpdateProductAttributeHandler implements ICommandHandler<UpdateProductAttributeCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductAttributeService
  ) {
  }

  async execute(command: UpdateProductAttributeCommand): Promise<ProductAttribute> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as ProductAttribute
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
