import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductVariantService } from '@vg/service-catalog/modules/productVariant/productVariant.service'
import { ProductVariant } from '@vg/proto-schema'
import { UpdateProductVariantCommand } from '@vg/service-catalog/modules/productVariant/commands'

@CommandHandler(UpdateProductVariantCommand)
export class UpdateProductVariantHandler
  implements ICommandHandler<UpdateProductVariantCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantService
  ) {}

  async execute(command: UpdateProductVariantCommand): Promise<ProductVariant> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as ProductVariant
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
