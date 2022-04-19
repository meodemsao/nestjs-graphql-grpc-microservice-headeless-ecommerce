import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import { DiscountProductDto } from '@vg/api-gateway/modules/discountProduct/dto/discountProduct.dto'
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

const dtoNames = getDTONames(DiscountProductDto, { dtoName: 'discountProduct' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class DiscountProductFilterArgs extends QueryArgsType(
  DiscountProductDto,
  {
    pagingStrategy: PagingStrategies.OFFSET
  }
) {}

@InputType(`${baseName}Input`)
export class DiscountProductInputType extends PartialType(
  DiscountProductDto,
  InputType
) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  DiscountProductInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  DiscountProductInputType
) {}

@ArgsType()
export class CreateDiscountProductInput extends MutationArgsType(
  CreateOneInput
) {}

@ArgsType()
export class CreateDiscountProductsInput extends MutationArgsType(
  CreateManyInput
) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  DiscountProductDto,
  DiscountProductInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  DiscountProductDto,
  DiscountProductInputType
) {}

@ArgsType()
export class UpdateDiscountProductInput extends MutationArgsType(
  UpdateOneInput
) {}

@ArgsType()
export class UpdateDiscountProductsInput extends MutationArgsType(
  UpdateManyInput
) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(DiscountProductDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(DiscountProductDto) {}

@ArgsType()
export class DeleteDiscountProductInput extends MutationArgsType(
  DeleteOneInput
) {}

@ArgsType()
export class DeleteDiscountProductsInput extends MutationArgsType(
  DeleteManyInput
) {}
