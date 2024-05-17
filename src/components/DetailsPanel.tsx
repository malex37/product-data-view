import { DetailsPanelProps } from "@/model/DetailsPanelProps";
import TagGroup from "./TagGroup";

export default function DetailsPanel(props: DetailsPanelProps) {
  return (
    <div>
      <TagGroup id={props.product.id} />
    </div>
  );
};
