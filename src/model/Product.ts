import { Tag } from "./Tag";

export interface Product {
  id: string;
  imageURI: string;
  subtitle: string;
  title: string;
  brand: string;
  tags: Tag[];
}
