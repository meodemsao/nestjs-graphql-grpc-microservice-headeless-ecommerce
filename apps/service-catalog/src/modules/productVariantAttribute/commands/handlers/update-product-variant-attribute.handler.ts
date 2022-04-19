import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantAttributeService } from '@vg/service-catalog/modules/productVariantAttribute/productVariantAttribute.service'
import { ProductVariantAttribute } from '@vg/proto-schema'
import { UpdateProductVariantAttributeCommand } from '@vg/service-catalog/modules/productVariantAttribute/commands'

@CommandHandler(UpdateProductVariantAttributeCommand)
export class UpdateProductVariantAttributeHandler
  implements ICommandHandler<UpdateProductVariantAttributeCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantAttributeService
  ) {}

  async execute(
    command: UpdateProductVariantAttributeCommand
  ): Promise<ProductVariantAttribute> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as ProductVariantAttribute
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
