import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { ManufacturerStoreDto } from '@vg/api-gateway/modules/manufacturerStore/dto/manufacturerStore.dto'

const dtoNames = getDTONames(ManufacturerStoreDto, { dtoName: 'manufacturerStore' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class ManufacturerStoreFilterArgs extends QueryArgsType(ManufacturerStoreDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class ManufacturerStoreInputType extends PartialType(ManufacturerStoreDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, ManufacturerStoreInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, ManufacturerStoreInputType) {
}

@ArgsType()
export class CreateManufacturerStoreInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateManufacturerStoresInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(ManufacturerStoreDto, ManufacturerStoreInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(ManufacturerStoreDto, ManufacturerStoreInputType) {
}

@ArgsType()
export class UpdateManufacturerStoreInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateManufacturerStoresInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(ManufacturerStoreDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(ManufacturerStoreDto) {
}

@ArgsType()
export class DeleteManufacturerStoreInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteManufacturerStoresInput extends MutationArgsType(DeleteManyInput) {
}
