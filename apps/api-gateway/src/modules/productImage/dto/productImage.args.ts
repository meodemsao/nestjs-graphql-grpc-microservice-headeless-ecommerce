import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { ProductImageDto } from '@vg/api-gateway/modules/productImage/dto/productImage.dto'

const dtoNames = getDTONames(ProductImageDto, { dtoName: 'productImage' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class ProductImageFilterArgs extends QueryArgsType(ProductImageDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class ProductImageInputType extends PartialType(ProductImageDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, ProductImageInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, ProductImageInputType) {
}

@ArgsType()
export class CreateProductImageInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateProductImagesInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(ProductImageDto, ProductImageInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(ProductImageDto, ProductImageInputType) {
}

@ArgsType()
export class UpdateProductImageInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateProductImagesInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ProductImageDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ProductImageDto) {
}

@ArgsType()
export class DeleteProductImageInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteProductImagesInput extends MutationArgsType(DeleteManyInput) {
}
