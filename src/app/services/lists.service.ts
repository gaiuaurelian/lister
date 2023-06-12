import { Injectable } from '@angular/core';

import { BehaviorSubject, map, switchMap } from 'rxjs';
import { List } from '../models/list.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ListTypesEnum } from '../models/list-type.enum';

const DEFAULT_LIST: List = {
  name: '',
  title: '',
  items: [],
  type: ListTypesEnum.UNSPECIFIED,
};

@Injectable({ providedIn: 'root' })
export class ListsService {
  private readonly list = new BehaviorSubject<List>(DEFAULT_LIST);
  private readonly lists = new BehaviorSubject<List[]>([]);
  private readonly baseUrl = 'http://localhost:3000/api';
  get list$() {
    return this.list.asObservable();
  }
  get lists$() {
    return this.lists.asObservable();
  }

  constructor(private readonly http: HttpClient) {}

  fetchAll() {
    this.http.get(`${this.baseUrl}/lists`).subscribe((response: any) => {
      this.lists.next(response.message);
    });
  }

  fetch(name = 'workspace') {
    this.http
      .get(`${this.baseUrl}/lists/${name}`)
      .subscribe((response: any) => {
        this.list.next(response.message.list);
        this.lists.next(response.message.children);
      });
  }

  create(list: List, parentListName: string | null) {
    let params = new HttpParams();
    if (parentListName) {
      params = params.append('withParent', parentListName);
    }
    this.http.post(`${this.baseUrl}/lists`, list, { params }).subscribe(() => {
      this.lists.next([...this.lists.value, list]);
    });
  }

  updateParentListLinks(parentListName: string, childListName: string) {
    this.http
      .post(`${this.baseUrl}/lists/add-parent-lists-links`, {
        parentListName,
        childListName,
      })
      .subscribe(() => {
        this.fetchAll();
      });
  }

  remove(listName: string) {
    this.http.delete(`${this.baseUrl}/lists/${listName}`).subscribe(() => {
      this.fetchAll();
    });
  }
}
