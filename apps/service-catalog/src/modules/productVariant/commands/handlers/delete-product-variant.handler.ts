import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductVariant } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteProductVariantCommand } from '@vg/service-catalog/modules/productVariant/commands'
import { ProductVariantService } from '@vg/service-catalog/modules/productVariant/productVariant.service'

@CommandHandler(DeleteProductVariantCommand)
export class DeleteProductVariantHandler
  implements ICommandHandler<DeleteProductVariantCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductVariantService
  ) {}

  async execute(command: DeleteProductVariantCommand): Promise<ProductVariant> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ProductVariant
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
