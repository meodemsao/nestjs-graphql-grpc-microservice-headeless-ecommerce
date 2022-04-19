import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductVariantPrice } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateProductVariantPriceCommand } from '@vg/service-catalog/modules/productVariantPrice/commands'
import { ProductVariantPriceService } from '@vg/service-catalog/modules/productVariantPrice/productVariantPrice.service'

@CommandHandler(CreateProductVariantPriceCommand)
export class CreateProductVariantPriceHandler
  implements ICommandHandler<CreateProductVariantPriceCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantPriceService
  ) {}

  async execute(
    command: CreateProductVariantPriceCommand
  ): Promise<ProductVariantPrice> {
    this.logger.log(`execute create product variant price command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ProductVariantPrice
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
