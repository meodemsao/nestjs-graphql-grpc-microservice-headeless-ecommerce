import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductAttribute } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteProductAttributeCommand } from '@vg/service-catalog/modules/productAttribute/commands'
import { ProductAttributeService } from '@vg/service-catalog/modules/productAttribute/productAttribute.service'

@CommandHandler(DeleteProductAttributeCommand)
export class DeleteProductAttributeHandler implements ICommandHandler<DeleteProductAttributeCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductAttributeService
  ) {
  }

  async execute(command: DeleteProductAttributeCommand): Promise<ProductAttribute> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ProductAttribute
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
