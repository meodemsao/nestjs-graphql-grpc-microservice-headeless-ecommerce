import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { ProductDto } from '@vg/api-gateway/modules/product/dto/product.dto'
import { ProductJSONFieldHook } from '@vg/api-gateway/modules/product/product.hook'

const dtoNames = getDTONames(ProductDto, { dtoName: 'product' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class ProductFilterArgs extends QueryArgsType(ProductDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
@BeforeCreateOne(ProductJSONFieldHook)
export class ProductInputType extends PartialType(ProductDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, ProductInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, ProductInputType) {
}

@ArgsType()
export class CreateProductInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateProductsInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(ProductDto, ProductInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(ProductDto, ProductInputType) {
}

@ArgsType()
export class UpdateProductInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateProductsInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ProductDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ProductDto) {
}

@ArgsType()
export class DeleteProductInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteProductsInput extends MutationArgsType(DeleteManyInput) {
}
