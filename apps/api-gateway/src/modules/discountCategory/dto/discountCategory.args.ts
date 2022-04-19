import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import { DiscountCategoryDto } from '@vg/api-gateway/modules/discountCategory/dto/discountCategory.dto'
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

const dtoNames = getDTONames(DiscountCategoryDto, {
  dtoName: 'discountCategory'
})

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class DiscountCategoryFilterArgs extends QueryArgsType(
  DiscountCategoryDto,
  {
    pagingStrategy: PagingStrategies.OFFSET
  }
) {}

@InputType(`${baseName}Input`)
export class DiscountCategoryInputType extends PartialType(
  DiscountCategoryDto,
  InputType
) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  DiscountCategoryInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  DiscountCategoryInputType
) {}

@ArgsType()
export class CreateDiscountCategoryInput extends MutationArgsType(
  CreateOneInput
) {}

@ArgsType()
export class CreateDiscountCategoriesInput extends MutationArgsType(
  CreateManyInput
) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  DiscountCategoryDto,
  DiscountCategoryInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  DiscountCategoryDto,
  DiscountCategoryInputType
) {}

@ArgsType()
export class UpdateDiscountCategoryInput extends MutationArgsType(
  UpdateOneInput
) {}

@ArgsType()
export class UpdateDiscountCategoriesInput extends MutationArgsType(
  UpdateManyInput
) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(DiscountCategoryDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(DiscountCategoryDto) {}

@ArgsType()
export class DeleteDiscountCategoryInput extends MutationArgsType(
  DeleteOneInput
) {}

@ArgsType()
export class DeleteDiscountCategoriesInput extends MutationArgsType(
  DeleteManyInput
) {}
