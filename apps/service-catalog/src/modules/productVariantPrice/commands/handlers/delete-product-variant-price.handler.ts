import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductVariantPrice } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteProductVariantPriceCommand } from '@vg/service-catalog/modules/productVariantPrice/commands'
import { ProductVariantPriceService } from '@vg/service-catalog/modules/productVariantPrice/productVariantPrice.service'

@CommandHandler(DeleteProductVariantPriceCommand)
export class DeleteProductVariantPriceHandler
  implements ICommandHandler<DeleteProductVariantPriceCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantPriceService
  ) {}

  async execute(
    command: DeleteProductVariantPriceCommand
  ): Promise<ProductVariantPrice> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ProductVariantPrice
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
