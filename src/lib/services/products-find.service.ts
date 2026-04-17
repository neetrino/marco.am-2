import { ProductFilters } from "./products-find-query.service";
import { productsFindQueryService } from "./products-find-query.service";
import { productsFindFilterService } from "./products-find-filter.service";
import { productsFindTransformService } from "./products-find-transform.service";

class ProductsFindService {
  /**
   * Get all products with filters
   */
  async findAll(filters: ProductFilters) {
    const {
      page = 1,
      limit = 12,
      lang = "en",
      sort,
    } = filters;

    // Step 1: Build query and fetch products from database
    const { products, bestsellerProductIds, total: totalFromQuery } =
      await productsFindQueryService.buildQueryAndFetch(filters);

    // Step 2: Filter products in memory (price, colors, sizes, brand) and sort
    const filteredProducts = productsFindFilterService.filterProducts(
      products,
      filters,
      bestsellerProductIds
    );

    // Step 3: Pagination — use server total when provided (no filters), else client slice
    const total =
      totalFromQuery !== undefined ? totalFromQuery : filteredProducts.length;
    const start = (page - 1) * limit;
    const paginatedProducts =
      totalFromQuery !== undefined
        ? filteredProducts
        : filteredProducts.slice(start, start + limit);

    // Step 4: Transform products to response format
    // Price sorting must use transformed final price (discount-aware) to match PLP output.
    if (
      totalFromQuery === undefined &&
      (sort === "price-asc" || sort === "price-desc" || sort === "price")
    ) {
      const transformedAll = await productsFindTransformService.transformProducts(filteredProducts, lang);
      transformedAll.sort((a: { price: number }, b: { price: number }) => {
        if (sort === "price-asc") {
          return a.price - b.price;
        }
        return b.price - a.price;
      });
      return {
        data: transformedAll.slice(start, start + limit),
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    }

    const data = await productsFindTransformService.transformProducts(paginatedProducts, lang);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export const productsFindService = new ProductsFindService();






