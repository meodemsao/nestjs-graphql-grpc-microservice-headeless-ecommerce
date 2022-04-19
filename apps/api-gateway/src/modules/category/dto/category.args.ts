import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { CategoryDto } from '@vg/api-gateway/modules/category/dto/category.dto'
import { CreatedByHook } from '@vg/api-gateway/modules/category/category.hook'
import { getDTONames } from '@vg/query-graphql/common'

const dtoNames = getDTONames(CategoryDto, { dtoName: 'category' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class CategoryFilterArgs extends QueryArgsType(CategoryDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
@BeforeCreateOne(CreatedByHook)
export class CategoryInputType extends PartialType(CategoryDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, CategoryInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, CategoryInputType) {
}

@ArgsType()
export class CreateCategoryInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateCategoriesInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(CategoryDto, CategoryInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(CategoryDto, CategoryInputType) {
}

@ArgsType()
export class UpdateCategoryInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateCategoriesInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(CategoryDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(CategoryDto) {
}

@ArgsType()
export class DeleteCategoryInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteCategoriesInput extends MutationArgsType(DeleteManyInput) {
}
