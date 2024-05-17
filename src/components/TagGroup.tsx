import { Tag } from "@/model/Tag";
import { TagGroupProps } from "@/model/TagGroupProps";
import ProductTag from "./ProductTag";

const TagGroup = (props: TagGroupProps) => {
  return (
    <div className="border-t-gray-400 border-b-gray-400 flex flex-row">
      {
        props.tags.map((tagElement: Tag) => {
          return <ProductTag text={tagElement.text} />
        })
      }
    </div>
  );
};

export default TagGroup;
