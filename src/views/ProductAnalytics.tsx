/**
 * Needs:
 *   - Left banner
 *   - Graph
 *   - Table
 */

import LineGraph from "@/components/LineGraph";
import ProductDetails from "@/components/ProductDetails";
import { Product } from "@/model/Product";
import { useSelector } from "react-redux";

export default function ProductAnalytics() {
  const defaultProduct = useSelector((state: any) => {
    return Object.values(state.products.items)[0];
  });
  return (
    <div id="product-analytics-view" className="w-full h-full">
      {defaultProduct ?
        <div className="h-full w-full flex flex-nowrap">
          <ProductDetails product={defaultProduct as Product} />
          <LineGraph productId={(defaultProduct as Product).id} saleType="retail" />
        </div> :
        <>
          Loading
        </>
      }
    </div>
  );
}
