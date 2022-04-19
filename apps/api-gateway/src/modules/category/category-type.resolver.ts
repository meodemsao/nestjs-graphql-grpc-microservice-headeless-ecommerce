import { Args, Context, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ProductDto } from '@vg/api-gateway/modules/product/dto/product.dto'
import { GqlContext } from '@vg/core'
import { CategoryDto } from '@vg/api-gateway/modules/category/dto/category.dto'
import { setRpcContext } from '@vg/core/helpers/set-grpc-context.helpers'

@Resolver(() => CategoryDto)
export class CategoryTypeResolver {
  constructor() {
  }

  @ResolveField('products', () => [ProductDto])
  async getProducts(
    @Context() context: GqlContext,
    @Parent() category: CategoryDto,
    @Args('limit', { nullable: true }) limit: number
  ): Promise<ProductDto[]> {
    const where = {
      categoryId: category.id
    }

    const products = await context.rpc?.catalog?.svc?.products(
      {
        filter: JSON.stringify(where),
        sorting: null,
        paging: null
      },
      setRpcContext(context)
    ).toPromise()

    console.log('products........', products)
    return products.products as unknown as ProductDto[]
  }
}
