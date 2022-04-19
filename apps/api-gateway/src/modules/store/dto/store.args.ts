import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import { StoreDto } from '@vg/api-gateway/modules/store/dto/store.dto'
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

const dtoNames = getDTONames(StoreDto, { dtoName: 'store' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } =
  dtoNames

@ArgsType()
export class StoreFilterArgs extends QueryArgsType(StoreDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {}

@InputType(`${baseName}Input`)
export class StoreInputType extends PartialType(StoreDto, InputType) {}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(
  baseNameLower,
  StoreInputType
) {}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(
  pluralBaseNameLower,
  StoreInputType
) {}

@ArgsType()
export class CreateStoreInput extends MutationArgsType(CreateOneInput) {}

@ArgsType()
export class CreateStoresInput extends MutationArgsType(CreateManyInput) {}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(StoreDto, StoreInputType) {}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(StoreDto, StoreInputType) {}

@ArgsType()
export class UpdateStoreInput extends MutationArgsType(UpdateOneInput) {}

@ArgsType()
export class UpdateStoresInput extends MutationArgsType(UpdateManyInput) {}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(StoreDto) {}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(StoreDto) {}

@ArgsType()
export class DeleteStoreInput extends MutationArgsType(DeleteOneInput) {}

@ArgsType()
export class DeleteStoresInput extends MutationArgsType(DeleteManyInput) {}
