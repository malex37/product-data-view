const ProductTag = (props: {
  text: string;
}) => {
  return (
    <div className="border rounded-md flex justify-center border-gray-300 pt-2 pb-2 pr-4 pl-4 flex-wrap text-nowrap">
      {props.text}
    </div>
  );
};
export default ProductTag;
