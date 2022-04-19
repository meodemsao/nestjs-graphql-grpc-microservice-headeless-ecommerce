import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { ProductLocationDto } from '@vg/api-gateway/modules/productLocation/dto/productLocation.dto'

const dtoNames = getDTONames(ProductLocationDto, { dtoName: 'productLocation' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class ProductLocationFilterArgs extends QueryArgsType(ProductLocationDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class ProductLocationInputType extends PartialType(ProductLocationDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, ProductLocationInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, ProductLocationInputType) {
}

@ArgsType()
export class CreateProductLocationInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateProductLocationsInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(ProductLocationDto, ProductLocationInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(ProductLocationDto, ProductLocationInputType) {
}

@ArgsType()
export class UpdateProductLocationInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateProductLocationsInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ProductLocationDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ProductLocationDto) {
}

@ArgsType()
export class DeleteProductLocationInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteProductLocationsInput extends MutationArgsType(DeleteManyInput) {
}
