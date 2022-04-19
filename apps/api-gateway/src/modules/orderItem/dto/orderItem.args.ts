import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import { OrderItemDto } from '@vg/api-gateway/modules/orderItem/dto/orderItem.dto'
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

const dtoNames = getDTONames(OrderItemDto, { dtoName: 'orderItem' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class OrderItemFilterArgs extends QueryArgsType(OrderItemDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {}

@InputType(`${baseName}Input`)
export class OrderItemInputType extends PartialType(OrderItemDto, InputType) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  OrderItemInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  OrderItemInputType
) {}

@ArgsType()
export class CreateOrderItemInput extends MutationArgsType(CreateOneInput) {}

@ArgsType()
export class CreateOrderItemsInput extends MutationArgsType(CreateManyInput) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  OrderItemDto,
  OrderItemInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  OrderItemDto,
  OrderItemInputType
) {}

@ArgsType()
export class UpdateOrderItemInput extends MutationArgsType(UpdateOneInput) {}

@ArgsType()
export class UpdateOrderItemsInput extends MutationArgsType(UpdateManyInput) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(OrderItemDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(OrderItemDto) {}

@ArgsType()
export class DeleteOrderItemInput extends MutationArgsType(DeleteOneInput) {}

@ArgsType()
export class DeleteOrderItemsInput extends MutationArgsType(DeleteManyInput) {}
