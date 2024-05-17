import { Product } from '@/model/Product';
import TagGroup from './TagGroup';
const ProductDetails = (
  { product }: { product: Product }
) => {
  return (
    <div className="flex flex-col">
      <div>
        <div>
          <img src={product.imageURI} />
        </div>
        <div>
          <p>{product.title}</p>
        </div>
        <div>{product.subtitle}</div>
      </div>
      <div>
        <TagGroup tags={product.tags} />
      </div>
    </div>
  );
};

export default ProductDetails;
