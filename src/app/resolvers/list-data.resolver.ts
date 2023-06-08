import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ListsService } from "../services/lists.service";

export const listDataResolver: ResolveFn<any> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const lService = inject(ListsService);
      const name = route.paramMap.get('name');
      return lService.fetch(name);
    };
