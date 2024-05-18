import { Product } from '@/model/Product';
import TagGroup from './TagGroup';
const ProductDetails = (
  { product }: { product: Product }
) => {
  return (
    <div className="flex flex-col w-[20%] m-10 round round-md floating-container">
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col items-center">
          <img src={product.imageURI} className="max-w-[75%]" />
          <p className="text-center font-bold text-2xl">{product.title}</p>
          <p className="text-center text-lg text-gray-500">{product.subtitle}</p>
        </div>
        <TagGroup id={product.id} />
      </div >
    </div>
  );
};

export default ProductDetails;
