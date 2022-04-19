import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType,
  DeleteManyInputType,
  DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType,
  UpdateManyInputType,
  UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { ProductVariantPriceDto } from '@vg/api-gateway/modules/productVariantPrice/dto/productVariantPrice.dto'

const dtoNames = getDTONames(ProductVariantPriceDto, {
  dtoName: 'productVariantPrice'
})

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class ProductVariantPriceFilterArgs extends QueryArgsType(
  ProductVariantPriceDto,
  {
    pagingStrategy: PagingStrategies.OFFSET
  }
) {}

@InputType(`${baseName}Input`)
export class ProductVariantPriceInputType extends PartialType(
  ProductVariantPriceDto,
  InputType
) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  ProductVariantPriceInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  ProductVariantPriceInputType
) {}

@ArgsType()
export class CreateProductVariantPriceInput extends MutationArgsType(
  CreateOneInput
) {}

@ArgsType()
export class CreateProductVariantPricesInput extends MutationArgsType(
  CreateManyInput
) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(
  ProductVariantPriceDto,
  ProductVariantPriceInputType
) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(
  ProductVariantPriceDto,
  ProductVariantPriceInputType
) {}

@ArgsType()
export class UpdateProductVariantPriceInput extends MutationArgsType(
  UpdateOneInput
) {}

@ArgsType()
export class UpdateProductVariantPricesInput extends MutationArgsType(
  UpdateManyInput
) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ProductVariantPriceDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ProductVariantPriceDto) {}

@ArgsType()
export class DeleteProductVariantPriceInput extends MutationArgsType(
  DeleteOneInput
) {}

@ArgsType()
export class DeleteProductVariantPricesInput extends MutationArgsType(
  DeleteManyInput
) {}
