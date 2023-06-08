import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { List } from '../models/list.model';

@Injectable({ providedIn: 'root' })
export class ListsService {
  private readonly lists = new BehaviorSubject<List[]>([]);

  get lists$() {
    return this.lists.asObservable();
  }

  create(list: List) {
    this.lists.next([...this.lists.value, list]);
  }

  remove(listName: string) {
    const newLists = this.lists.value.filter((x) => x.name !== listName);
    this.lists.next([...newLists]);
  }
}
