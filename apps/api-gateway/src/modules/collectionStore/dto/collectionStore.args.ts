import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { CollectionStoreDto } from '@vg/api-gateway/modules/collectionStore/dto/collectionStore.dto'

const dtoNames = getDTONames(CollectionStoreDto, { dtoName: 'collectionStore' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class CollectionStoreFilterArgs extends QueryArgsType(CollectionStoreDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class CollectionStoreInputType extends PartialType(CollectionStoreDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, CollectionStoreInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, CollectionStoreInputType) {
}

@ArgsType()
export class CreateCollectionStoreInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateCollectionStoresInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(CollectionStoreDto, CollectionStoreInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(CollectionStoreDto, CollectionStoreInputType) {
}

@ArgsType()
export class UpdateCollectionStoreInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateCollectionStoresInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(CollectionStoreDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(CollectionStoreDto) {
}

@ArgsType()
export class DeleteCollectionStoreInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteCollectionStoresInput extends MutationArgsType(DeleteManyInput) {
}
