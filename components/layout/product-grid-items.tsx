import { ProductCard } from "components/product-card";
import { Product } from "lib/shopify/types";

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <li key={product.handle}>
          <ProductCard product={product} />
        </li>
      ))}
    </>
  );
}
