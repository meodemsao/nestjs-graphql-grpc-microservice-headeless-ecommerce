import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { ProductCollectionDto } from '@vg/api-gateway/modules/productCollection/dto/productCollection.dto'

const dtoNames = getDTONames(ProductCollectionDto, { dtoName: 'productCollection' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class ProductCollectionFilterArgs extends QueryArgsType(ProductCollectionDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class ProductCollectionInputType extends PartialType(ProductCollectionDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, ProductCollectionInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, ProductCollectionInputType) {
}

@ArgsType()
export class CreateProductCollectionInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateProductCollectionsInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(ProductCollectionDto, ProductCollectionInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(ProductCollectionDto, ProductCollectionInputType) {
}

@ArgsType()
export class UpdateProductCollectionInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateProductCollectionsInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ProductCollectionDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ProductCollectionDto) {
}

@ArgsType()
export class DeleteProductCollectionInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteProductCollectionsInput extends MutationArgsType(DeleteManyInput) {
}
