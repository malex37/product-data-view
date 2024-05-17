import { Tag } from "@/model/Tag";
import { TagGroupProps } from "@/model/TagGroupProps";
import ProductTag from "./ProductTag";
import { useSelector } from "react-redux";

const TagGroup = (props: TagGroupProps) => {
  const product = useSelector((state: any) => {
    return state.products.items[props.id]
  });
  return (
    <div className="w-full border border-t-gray-300 border-b-gray-300 border-r-white border-l-white flex flex-wrap gap-2 p-4">
      {
        product.tags.map((tagElement: Tag, index: number) => {
          return <ProductTag key={index} text={tagElement.text} />
        })
      }
    </div>
  );
};

export default TagGroup;
