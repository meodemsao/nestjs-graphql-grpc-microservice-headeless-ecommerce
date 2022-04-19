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
import { MetaTagDto } from '@vg/api-gateway/modules/metaTag/dto/metaTag.dto'

const dtoNames = getDTONames(MetaTagDto, { dtoName: 'metaTag' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class MetaTagFilterArgs extends QueryArgsType(MetaTagDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {}

@InputType(`${baseName}Input`)
export class MetaTagInputType extends PartialType(MetaTagDto, InputType) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  MetaTagInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  MetaTagInputType
) {}

@ArgsType()
export class CreateMetaTagInput extends MutationArgsType(CreateOneInput) {}

@ArgsType()
export class CreateMetaTagsInput extends MutationArgsType(CreateManyInput) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(MetaTagDto, MetaTagInputType) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  MetaTagDto,
  MetaTagInputType
) {}

@ArgsType()
export class UpdateMetaTagInput extends MutationArgsType(UpdateOneInput) {}

@ArgsType()
export class UpdateMetaTagsInput extends MutationArgsType(UpdateManyInput) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(MetaTagDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(MetaTagDto) {}

@ArgsType()
export class DeleteMetaTagInput extends MutationArgsType(DeleteOneInput) {}

@ArgsType()
export class DeleteMetaTagsInput extends MutationArgsType(DeleteManyInput) {}
