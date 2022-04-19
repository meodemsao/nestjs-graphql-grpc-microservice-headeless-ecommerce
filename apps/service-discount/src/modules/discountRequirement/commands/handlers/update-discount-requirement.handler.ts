import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { DiscountRequirementService } from '../../discountRequirement.service'
import { DiscountRequirement } from '@vg/proto-schema'
import { UpdateDiscountRequirementCommand } from '../index'

@CommandHandler(UpdateDiscountRequirementCommand)
export class UpdateDiscountRequirementHandler
  implements ICommandHandler<UpdateDiscountRequirementCommand>
{
  logger = new Logger(this.constructor.name)

  constructor(
    private readonly eventBus: EventBus,
    private readonly service: DiscountRequirementService
  ) {}

  async execute(
    command: UpdateDiscountRequirementCommand
  ): Promise<DiscountRequirement> {
    try {
      const result = await this.service.update(
        command.data.id,
        command.data.data
      )

      return result as DiscountRequirement
    } catch (error) {
      this.logger.error(error)
      throw new RpcException(error)
    }
  }
}
