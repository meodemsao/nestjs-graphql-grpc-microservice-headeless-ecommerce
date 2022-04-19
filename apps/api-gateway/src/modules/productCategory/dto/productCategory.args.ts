import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { ProductCategoryDto } from '@vg/api-gateway/modules/productCategory/dto/productCategory.dto'

const dtoNames = getDTONames(ProductCategoryDto, { dtoName: 'productCategory' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class ProductCategoryFilterArgs extends QueryArgsType(ProductCategoryDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class ProductCategoryInputType extends PartialType(ProductCategoryDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, ProductCategoryInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, ProductCategoryInputType) {
}

@ArgsType()
export class CreateProductCategoryInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateProductCategorysInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(ProductCategoryDto, ProductCategoryInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(ProductCategoryDto, ProductCategoryInputType) {
}

@ArgsType()
export class UpdateProductCategoryInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateProductCategorysInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ProductCategoryDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ProductCategoryDto) {
}

@ArgsType()
export class DeleteProductCategoryInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteProductCategorysInput extends MutationArgsType(DeleteManyInput) {
}
