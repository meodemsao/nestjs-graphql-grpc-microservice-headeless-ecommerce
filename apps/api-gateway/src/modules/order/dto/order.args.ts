import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import { OrderDto } from '@vg/api-gateway/modules/order/dto/order.dto'
import {
  CreateManyInputType,
  CreateOneInputType,
  DeleteManyInputType,
  DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType,
  UpdateManyInputType,
  UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'

const dtoNames = getDTONames(OrderDto, { dtoName: 'order' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class OrderFilterArgs extends QueryArgsType(OrderDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {}

@InputType(`${baseName}Input`)
export class OrderInputType extends PartialType(OrderDto, InputType) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  OrderInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  OrderInputType
) {}

@ArgsType()
export class CreateOrderInput extends MutationArgsType(CreateOneInput) {}

@ArgsType()
export class CreateOrdersInput extends MutationArgsType(CreateManyInput) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(OrderDto, OrderInputType) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(OrderDto, OrderInputType) {}

@ArgsType()
export class UpdateOrderInput extends MutationArgsType(UpdateOneInput) {}

@ArgsType()
export class UpdateOrdersInput extends MutationArgsType(UpdateManyInput) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(OrderDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(OrderDto) {}

@ArgsType()
export class DeleteOrderInput extends MutationArgsType(DeleteOneInput) {}

@ArgsType()
export class DeleteOrdersInput extends MutationArgsType(DeleteManyInput) {}
