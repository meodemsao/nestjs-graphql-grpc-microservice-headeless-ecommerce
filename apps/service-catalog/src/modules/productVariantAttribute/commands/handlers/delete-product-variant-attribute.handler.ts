import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductVariantAttribute } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteProductVariantAttributeCommand } from '@vg/service-catalog/modules/productVariantAttribute/commands'
import { ProductVariantAttributeService } from '@vg/service-catalog/modules/productVariantAttribute/productVariantAttribute.service'

@CommandHandler(DeleteProductVariantAttributeCommand)
export class DeleteProductVariantAttributeHandler
  implements ICommandHandler<DeleteProductVariantAttributeCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantAttributeService
  ) {}

  async execute(
    command: DeleteProductVariantAttributeCommand
  ): Promise<ProductVariantAttribute> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ProductVariantAttribute
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
