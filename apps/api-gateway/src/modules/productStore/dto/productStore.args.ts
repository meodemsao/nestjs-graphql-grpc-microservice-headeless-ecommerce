import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { ProductStoreDto } from '@vg/api-gateway/modules/productStore/dto/productStore.dto'

const dtoNames = getDTONames(ProductStoreDto, { dtoName: 'productStore' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class ProductStoreFilterArgs extends QueryArgsType(ProductStoreDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class ProductStoreInputType extends PartialType(ProductStoreDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, ProductStoreInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, ProductStoreInputType) {
}

@ArgsType()
export class CreateProductStoreInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateProductStoresInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(ProductStoreDto, ProductStoreInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(ProductStoreDto, ProductStoreInputType) {
}

@ArgsType()
export class UpdateProductStoreInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateProductStoresInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ProductStoreDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ProductStoreDto) {
}

@ArgsType()
export class DeleteProductStoreInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteProductStoresInput extends MutationArgsType(DeleteManyInput) {
}
