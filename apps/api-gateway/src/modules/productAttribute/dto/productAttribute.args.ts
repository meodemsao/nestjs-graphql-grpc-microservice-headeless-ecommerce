import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { ProductAttributeDto } from '@vg/api-gateway/modules/productAttribute/dto/productAttribute.dto'

const dtoNames = getDTONames(ProductAttributeDto, { dtoName: 'productAttribute' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class ProductAttributeFilterArgs extends QueryArgsType(ProductAttributeDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class ProductAttributeInputType extends PartialType(ProductAttributeDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, ProductAttributeInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, ProductAttributeInputType) {
}

@ArgsType()
export class CreateProductAttributeInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateProductAttributesInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(ProductAttributeDto, ProductAttributeInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(ProductAttributeDto, ProductAttributeInputType) {
}

@ArgsType()
export class UpdateProductAttributeInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateProductAttributesInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ProductAttributeDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ProductAttributeDto) {
}

@ArgsType()
export class DeleteProductAttributeInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteProductAttributesInput extends MutationArgsType(DeleteManyInput) {
}
