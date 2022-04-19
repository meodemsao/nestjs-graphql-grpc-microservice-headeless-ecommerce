import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantPriceService } from '@vg/service-catalog/modules/productVariantPrice/productVariantPrice.service'
import { ProductVariantPrice } from '@vg/proto-schema'
import { UpdateProductVariantPriceCommand } from '@vg/service-catalog/modules/productVariantPrice/commands'

@CommandHandler(UpdateProductVariantPriceCommand)
export class UpdateProductVariantPriceHandler
  implements ICommandHandler<UpdateProductVariantPriceCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantPriceService
  ) {}

  async execute(
    command: UpdateProductVariantPriceCommand
  ): Promise<ProductVariantPrice> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as ProductVariantPrice
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
