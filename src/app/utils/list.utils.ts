import { ListTypesEnum } from '../models/list-type.enum';

export function isNavigationList(type: ListTypesEnum) {
  return type === ListTypesEnum.WORKSPACE || type === ListTypesEnum.PAGE;
}
