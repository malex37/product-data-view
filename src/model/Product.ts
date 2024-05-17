import { Tag } from "./Tag";

export interface Product {
  imageURI: string;
  subtitle: string;
  title: string;
  brand: string;
  tags: Tag[];
}
