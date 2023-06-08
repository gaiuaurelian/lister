import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { List } from '../models/list.model';

@Injectable({ providedIn: 'root' })
export class ListsService {
  private readonly lists = new BehaviorSubject<List[]>([]);

  get lists$() {
    return this.lists.asObservable();
  }

  fetch(name: string | null) {
    if (!name) return null;
    return this.lists.value.find((x) => x.name === name);
  }

  create(list: List) {
    this.lists.next([...this.lists.value, list]);
  }

  remove(listName: string) {
    const newLists = this.lists.value.filter((x) => x.name !== listName);
    this.lists.next([...newLists]);
  }
}
