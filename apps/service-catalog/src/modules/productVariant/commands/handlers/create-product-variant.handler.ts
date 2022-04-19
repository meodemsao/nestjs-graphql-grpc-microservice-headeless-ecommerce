import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductVariant } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { CreateProductVariantCommand } from '@vg/service-catalog/modules/productVariant/commands'
import { ProductVariantService } from '@vg/service-catalog/modules/productVariant/productVariant.service'

@CommandHandler(CreateProductVariantCommand)
export class CreateProductVariantHandler
  implements ICommandHandler<CreateProductVariantCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantService
  ) {}

  async execute(command: CreateProductVariantCommand): Promise<ProductVariant> {
    this.logger.log(`execute create attribute option command`)
    try {
      const result = await this.service.create(command.request.data)
      return result as ProductVariant
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
