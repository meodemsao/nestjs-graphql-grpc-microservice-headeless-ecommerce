import { ArgsType, InputType, PartialType } from '@nestjs/graphql'
import {
  CreateManyInputType,
  CreateOneInputType, DeleteManyInputType, DeleteOneInputType,
  MutationArgsType,
  PagingStrategies,
  QueryArgsType, UpdateManyInputType, UpdateOneInputType
} from '@vg/query-graphql'
import { getDTONames } from '@vg/query-graphql/common'
import { CollectionLocationDto } from '@vg/api-gateway/modules/collectionLocation/dto/collectionLocation.dto'

const dtoNames = getDTONames(CollectionLocationDto, { dtoName: 'collectionLocation' })

const { baseNameLower, pluralBaseName, baseName, pluralBaseNameLower } = dtoNames

@ArgsType()
export class CollectionLocationFilterArgs extends QueryArgsType(CollectionLocationDto, {
  pagingStrategy: PagingStrategies.OFFSET
}) {
}

@InputType(`${baseName}Input`)
export class CollectionLocationInputType extends PartialType(CollectionLocationDto, InputType) {
}

/**
 * CREATE
 */
@InputType(`CreateOne${baseName}Input`)
export class CreateOneInput extends CreateOneInputType(baseNameLower, CollectionLocationInputType) {
}

@InputType(`CreateOne${baseName}Input`)
class CreateManyInput extends CreateManyInputType(pluralBaseNameLower, CollectionLocationInputType) {
}

@ArgsType()
export class CreateCollectionLocationInput extends MutationArgsType(CreateOneInput) {
}

@ArgsType()
export class CreateCollectionLocationsInput extends MutationArgsType(CreateManyInput) {
}

/**
 * UPDATE
 */

@InputType(`UpdateOne${baseName}Input`)
class UpdateOneInput extends UpdateOneInputType(CollectionLocationDto, CollectionLocationInputType) {
}

@InputType(`UpdateMany${pluralBaseName}Input`)
class UpdateManyInput extends UpdateManyInputType(CollectionLocationDto, CollectionLocationInputType) {
}

@ArgsType()
export class UpdateCollectionLocationInput extends MutationArgsType(UpdateOneInput) {
}

@ArgsType()
export class UpdateCollectionLocationsInput extends MutationArgsType(UpdateManyInput) {
}

/**
 * DELETE
 */
@InputType(`DeleteOne${baseName}Input`)
class DeleteOneInput extends DeleteOneInputType(CollectionLocationDto) {
}

@InputType(`DeleteMany${pluralBaseName}Input`)
class DeleteManyInput extends DeleteManyInputType(CollectionLocationDto) {
}

@ArgsType()
export class DeleteCollectionLocationInput extends MutationArgsType(DeleteOneInput) {
}

@ArgsType()
export class DeleteCollectionLocationsInput extends MutationArgsType(DeleteManyInput) {
}
