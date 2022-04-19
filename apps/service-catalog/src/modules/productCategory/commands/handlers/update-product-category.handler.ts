import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { ProductCategoryService } from '@vg/service-catalog/modules/productCategory/productCategory.service'
import { ProductCategory } from '@vg/proto-schema'
import { UpdateProductCategoryCommand } from '@vg/service-catalog/modules/productCategory/commands'

@CommandHandler(UpdateProductCategoryCommand)
export class UpdateProductCategoryHandler implements ICommandHandler<UpdateProductCategoryCommand> {
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: ProductCategoryService
  ) {
  }

  async execute(command: UpdateProductCategoryCommand): Promise<ProductCategory> {
    try {
      const result = await this.service.update(command.data.id, command.data.data)

      return result as ProductCategory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
