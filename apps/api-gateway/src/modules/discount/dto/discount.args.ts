import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import { DiscountDto } from '@vg/api-gateway/modules/discount/dto/discount.dto'
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

const dtoNames = getDTONames(DiscountDto, { dtoName: 'discount' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class DiscountFilterArgs extends QueryArgsType(DiscountDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {}

@InputType(`${baseName}Input`)
export class DiscountInputType extends PartialType(DiscountDto, InputType) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  DiscountInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  DiscountInputType
) {}

@ArgsType()
export class CreateDiscountInput extends MutationArgsType(CreateOneInput) {}

@ArgsType()
export class CreateDiscountsInput extends MutationArgsType(CreateManyInput) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  DiscountDto,
  DiscountInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  DiscountDto,
  DiscountInputType
) {}

@ArgsType()
export class UpdateDiscountInput extends MutationArgsType(UpdateOneInput) {}

@ArgsType()
export class UpdateDiscountsInput extends MutationArgsType(UpdateManyInput) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(DiscountDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(DiscountDto) {}

@ArgsType()
export class DeleteDiscountInput extends MutationArgsType(DeleteOneInput) {}

@ArgsType()
export class DeleteDiscountsInput extends MutationArgsType(DeleteManyInput) {}
