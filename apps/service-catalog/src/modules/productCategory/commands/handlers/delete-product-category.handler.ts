import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { ProductCategory } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteProductCategoryCommand } from '@vg/service-catalog/modules/productCategory/commands'
import { ProductCategoryService } from '@vg/service-catalog/modules/productCategory/productCategory.service'

@CommandHandler(DeleteProductCategoryCommand)
export class DeleteProductCategoryHandler implements ICommandHandler<DeleteProductCategoryCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductCategoryService
  ) {
  }

  async execute(command: DeleteProductCategoryCommand): Promise<ProductCategory> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as ProductCategory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
