import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import { DiscountRequirementDto } from '@vg/api-gateway/modules/discountRequirement/dto/discountRequirement.dto'
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

const dtoNames = getDTONames(DiscountRequirementDto, {
  dtoName: 'discountRequirement'
})

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class DiscountRequirementFilterArgs extends QueryArgsType(
  DiscountRequirementDto,
  {
    pagingStrategy: PagingStrategies.OFFSET
  }
) {}

@InputType(`${baseName}Input`)
export class DiscountRequirementInputType extends PartialType(
  DiscountRequirementDto,
  InputType
) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  DiscountRequirementInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  DiscountRequirementInputType
) {}

@ArgsType()
export class CreateDiscountRequirementInput extends MutationArgsType(
  CreateOneInput
) {}

@ArgsType()
export class CreateDiscountRequirementsInput extends MutationArgsType(
  CreateManyInput
) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  DiscountRequirementDto,
  DiscountRequirementInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  DiscountRequirementDto,
  DiscountRequirementInputType
) {}

@ArgsType()
export class UpdateDiscountRequirementInput extends MutationArgsType(
  UpdateOneInput
) {}

@ArgsType()
export class UpdateDiscountRequirementsInput extends MutationArgsType(
  UpdateManyInput
) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(DiscountRequirementDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(DiscountRequirementDto) {}

@ArgsType()
export class DeleteDiscountRequirementInput extends MutationArgsType(
  DeleteOneInput
) {}

@ArgsType()
export class DeleteDiscountRequirementsInput extends MutationArgsType(
  DeleteManyInput
) {}
