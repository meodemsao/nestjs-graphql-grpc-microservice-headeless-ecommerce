import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { CollectionDto } from '@vg/api-gateway/modules/collection/dto/collection.dto'

const dtoNames = getDTONames(CollectionDto, { dtoName: 'collection' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class CollectionFilterArgs extends QueryArgsType(CollectionDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class CollectionInputType extends PartialType(CollectionDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, CollectionInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, CollectionInputType) {
}

@ArgsType()
export class CreateCollectionInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateCollectionsInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(CollectionDto, CollectionInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(CollectionDto, CollectionInputType) {
}

@ArgsType()
export class UpdateCollectionInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateCollectionsInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(CollectionDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(CollectionDto) {
}

@ArgsType()
export class DeleteCollectionInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteCollectionsInput extends MutationArgsType(DeleteManyInput) {
}
