import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { CategoryStoreDto } from '@vg/api-gateway/modules/categoryStore/dto/categoryStore.dto'

const dtoNames = getDTONames(CategoryStoreDto, { dtoName: 'categoryStore' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class CategoryStoreFilterArgs extends QueryArgsType(CategoryStoreDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class CategoryStoreInputType extends PartialType(CategoryStoreDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, CategoryStoreInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, CategoryStoreInputType) {
}

@ArgsType()
export class CreateCategoryStoreInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateCategoryStoresInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(CategoryStoreDto, CategoryStoreInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(CategoryStoreDto, CategoryStoreInputType) {
}

@ArgsType()
export class UpdateCategoryStoreInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateCategoryStoresInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(CategoryStoreDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(CategoryStoreDto) {
}

@ArgsType()
export class DeleteCategoryStoreInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteCategoryStoresInput extends MutationArgsType(DeleteManyInput) {
}
