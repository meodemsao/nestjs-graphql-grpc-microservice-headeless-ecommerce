import { Injectable } from '@nestjs/common'
import {
  BeforeCreateManyHook,
  BeforeCreateOneHook,
  CreateManyInputType,
  CreateOneInputType
} from '@vg/query-graphql'
import { GqlContext } from '@vg/core'

interface JsonField {
  attributes: string
  variantAttributes: string
}

@Injectable()
export class ProductJSONFieldHook<T extends JsonField>
  implements BeforeCreateOneHook<T, GqlContext>, BeforeCreateManyHook<T, GqlContext> {

  run(instance: CreateManyInputType<T>, context: GqlContext): Promise<CreateManyInputType<T>>;
  run(instance: CreateOneInputType<T>, context: GqlContext): Promise<CreateOneInputType<T>>;


  async run(
    instance: CreateOneInputType<T> | CreateManyInputType<T>,
    context: GqlContext
  ): Promise<CreateOneInputType<T> | CreateManyInputType<T>> {

    // @ts-ignore
    instance.input.attributes = instance.input.attributes ? JSON.stringify(instance.input.attributes) : null

    // @ts-ignore
    instance.input.variantAttributes = instance.input.attributes ? JSON.stringify(instance.input.variantAttributes) : null
    return instance
  }
}