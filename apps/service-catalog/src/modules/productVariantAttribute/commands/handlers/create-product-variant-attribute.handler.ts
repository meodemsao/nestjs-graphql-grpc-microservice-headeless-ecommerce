import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductVariantAttribute } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateProductVariantAttributeCommand } from '@vg/service-catalog/modules/productVariantAttribute/commands'
import { ProductVariantAttributeService } from '@vg/service-catalog/modules/productVariantAttribute/productVariantAttribute.service'

@CommandHandler(CreateProductVariantAttributeCommand)
export class CreateProductVariantAttributeHandler
  implements ICommandHandler<CreateProductVariantAttributeCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantAttributeService
  ) {}

  async execute(
    command: CreateProductVariantAttributeCommand
  ): Promise<ProductVariantAttribute> {
    this.logger.log(`execute create attribute option command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ProductVariantAttribute
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
