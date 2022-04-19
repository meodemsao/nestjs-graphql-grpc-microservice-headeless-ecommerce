import { Injectable } from '@nestjs/common'
import {
  BeforeCreateManyHook,
  BeforeCreateOneHook,
  CreateManyInputType,
  CreateOneInputType
} from '@vg/query-graphql'
import { GqlContext } from '@vg/core'
import { getUserName } from '@vg/core/helpers/auth.helper'

interface CreatedBy {
  createdBy: string;
}

@Injectable()
export class CreatedByHook<T extends CreatedBy>
  implements BeforeCreateOneHook<T, GqlContext>, BeforeCreateManyHook<T, GqlContext> {

  run(instance: CreateManyInputType<T>, context: GqlContext): Promise<CreateManyInputType<T>>;
  run(instance: CreateOneInputType<T>, context: GqlContext): Promise<CreateOneInputType<T>>;
  async run(
    instance: CreateOneInputType<T> | CreateManyInputType<T>,
    context: GqlContext
  ): Promise<CreateOneInputType<T> | CreateManyInputType<T>> {

    // @ts-ignore
    instance.input.createdBy = getUserName(context)?.preferred_username
    return instance
  }
}