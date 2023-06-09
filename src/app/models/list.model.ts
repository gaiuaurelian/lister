import { ListTypesEnum } from "./list-type.enum";

export interface List {
  name: string;
  title: string;
  items: List[];
  type: ListTypesEnum;
}
