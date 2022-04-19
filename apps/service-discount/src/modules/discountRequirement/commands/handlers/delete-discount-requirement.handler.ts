import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DiscountRequirement } from '@vg/proto-schema'
import { RpcException } from '@nestjs/microservices'
import { DeleteDiscountRequirementCommand } from '../index'
import { DiscountRequirementService } from '../../discountRequirement.service'

@CommandHandler(DeleteDiscountRequirementCommand)
export class DeleteDiscountRequirementHandler
  implements ICommandHandler<DeleteDiscountRequirementCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountRequirementService
  ) {}

  async execute(
    command: DeleteDiscountRequirementCommand
  ): Promise<DiscountRequirement> {
    try {
      const result = await this.service.delete(command.data.id)

      return result as DiscountRequirement
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
