import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { CategoryLocationDto } from '@vg/api-gateway/modules/categoryLocation/dto/categoryLocation.dto'

const dtoNames = getDTONames(CategoryLocationDto, { dtoName: 'categoryLocation' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class CategoryLocationFilterArgs extends QueryArgsType(CategoryLocationDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class CategoryLocationInputType extends PartialType(CategoryLocationDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, CategoryLocationInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, CategoryLocationInputType) {
}

@ArgsType()
export class CreateCategoryLocationInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateCategoryLocationsInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(CategoryLocationDto, CategoryLocationInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(CategoryLocationDto, CategoryLocationInputType) {
}

@ArgsType()
export class UpdateCategoryLocationInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateCategoryLocationsInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(CategoryLocationDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(CategoryLocationDto) {
}

@ArgsType()
export class DeleteCategoryLocationInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteCategoryLocationsInput extends MutationArgsType(DeleteManyInput) {
}
