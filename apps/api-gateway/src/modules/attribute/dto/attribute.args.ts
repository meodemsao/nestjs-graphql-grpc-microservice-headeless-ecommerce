import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import { AttributeDto } from '@vg/api-gateway/modules/attribute/dto/attribute.dto'
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

const dtoNames = getDTONames(AttributeDto, { dtoName: 'attribute' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class AttributeFilterArgs extends QueryArgsType(AttributeDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {}

@InputType(`${baseName}Input`)
export class AttributeInputType extends PartialType(AttributeDto, InputType) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  AttributeInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  AttributeInputType
) {}

@ArgsType()
export class CreateAttributeInput extends MutationArgsType(CreateOneInput) {}

@ArgsType()
export class CreateAttributesInput extends MutationArgsType(CreateManyInput) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  AttributeDto,
  AttributeInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  AttributeDto,
  AttributeInputType
) {}

@ArgsType()
export class UpdateAttributeInput extends MutationArgsType(UpdateOneInput) {}

@ArgsType()
export class UpdateAttributesInput extends MutationArgsType(UpdateManyInput) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(AttributeDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(AttributeDto) {}

@ArgsType()
export class DeleteAttributeInput extends MutationArgsType(DeleteOneInput) {}

@ArgsType()
export class DeleteAttributesInput extends MutationArgsType(DeleteManyInput) {}
