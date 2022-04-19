import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { TemplateDto } from '@vg/api-gateway/modules/template/dto/template.dto'

const dtoNames = getDTONames(TemplateDto, { dtoName: 'template' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class TemplateFilterArgs extends QueryArgsType(TemplateDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class TemplateInputType extends PartialType(TemplateDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, TemplateInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, TemplateInputType) {
}

@ArgsType()
export class CreateTemplateInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateTemplatesInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(TemplateDto, TemplateInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(TemplateDto, TemplateInputType) {
}

@ArgsType()
export class UpdateTemplateInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateTemplatesInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(TemplateDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(TemplateDto) {
}

@ArgsType()
export class DeleteTemplateInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteTemplatesInput extends MutationArgsType(DeleteManyInput) {
}
