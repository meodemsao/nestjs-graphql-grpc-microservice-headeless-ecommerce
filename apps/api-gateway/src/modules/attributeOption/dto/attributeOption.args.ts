import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
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
import { AttributeOptionDto } from '@vg/api-gateway/modules/attributeOption/dto/attributeOption.dto'

const dtoNames = getDTONames(AttributeOptionDto, { dtoName: 'attributeOption' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class AttributeOptionFilterArgs extends QueryArgsType(
  AttributeOptionDto,
  {
    pagingStrategy: PagingStrategies.OFFSET
  }
) {}

@InputType(`${baseName}Input`)
export class AttributeOptionInputType extends PartialType(
  AttributeOptionDto,
  InputType
) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  AttributeOptionInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  AttributeOptionInputType
) {}

@ArgsType()
export class CreateAttributeOptionInput extends MutationArgsType(
  CreateOneInput
) {}

@ArgsType()
export class CreateAttributeOptionsInput extends MutationArgsType(
  CreateManyInput
) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  AttributeOptionDto,
  AttributeOptionInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  AttributeOptionDto,
  AttributeOptionInputType
) {}

@ArgsType()
export class UpdateAttributeOptionInput extends MutationArgsType(
  UpdateOneInput
) {}

@ArgsType()
export class UpdateAttributeOptionsInput extends MutationArgsType(
  UpdateManyInput
) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(AttributeOptionDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(AttributeOptionDto) {}

@ArgsType()
export class DeleteAttributeOptionInput extends MutationArgsType(
  DeleteOneInput
) {}

@ArgsType()
export class DeleteAttributeOptionsInput extends MutationArgsType(
  DeleteManyInput
) {}
