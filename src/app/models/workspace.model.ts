import { List } from "./list.model";

export interface Workspace extends List {
  items: List[];
}
