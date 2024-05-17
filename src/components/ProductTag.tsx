const ProductTag = (props: {
  text: string;
}) => {
  return (
    <div className="border rounded-s flex justify-center border-t-">
      {props.text}
    </div>
  );
};
export default ProductTag;
