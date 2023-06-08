import { ListTypesEnum } from "./list-type.enum";

export interface List {
  name: string;
  title: string;
  // TODO: create the Item type
  items: unknown[];
  type: ListTypesEnum;
}
