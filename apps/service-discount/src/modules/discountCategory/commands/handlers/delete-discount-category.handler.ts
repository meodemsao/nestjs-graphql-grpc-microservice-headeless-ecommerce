import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DiscountCategory } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteDiscountCategoryCommand } from '../index'
import { DiscountCategoryService } from '../../discountCategory.service'

@CommandHandler(DeleteDiscountCategoryCommand)
export class DeleteDiscountCategoryHandler
  implements ICommandHandler<DeleteDiscountCategoryCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountCategoryService
  ) {}

  async execute(
    command: DeleteDiscountCategoryCommand
  ): Promise<DiscountCategory> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as DiscountCategory
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
