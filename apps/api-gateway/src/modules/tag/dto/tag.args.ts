import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { TagDto } from '@vg/api-gateway/modules/tag/dto/tag.dto'

const dtoNames = getDTONames(TagDto, { dtoName: 'tag' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class TagFilterArgs extends QueryArgsType(TagDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class TagInputType extends PartialType(TagDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, TagInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, TagInputType) {
}

@ArgsType()
export class CreateTagInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateTagsInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(TagDto, TagInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(TagDto, TagInputType) {
}

@ArgsType()
export class UpdateTagInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateTagsInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(TagDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(TagDto) {
}

@ArgsType()
export class DeleteTagInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteTagsInput extends MutationArgsType(DeleteManyInput) {
}
