import { Injectable } from '@angular/core';

import { BehaviorSubject, map, switchMap } from 'rxjs';
import { List } from '../models/list.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ListsService {
  private readonly lists = new BehaviorSubject<List[]>([]);
  private readonly baseUrl = 'http://localhost:3000/api';
  get lists$() {
    return this.lists.asObservable();
  }

  constructor(private readonly http: HttpClient) {}

  fetchAll() {
    this.http.get(`${this.baseUrl}/lists`).subscribe((response: any) => {
      this.lists.next(response.message);
    });
  }

  fetch(name: string | null) {
    if (!name) return null;
    return this.http
      .get(`${this.baseUrl}/lists/${name}`)
      .pipe(map((response: any) => response.message));
  }

  create(list: List) {
    this.http.post(`${this.baseUrl}/lists`, list).subscribe(() => {
      this.lists.next([...this.lists.value, list]);
    });
  }

  remove(listName: string) {
    this.http.delete(`${this.baseUrl}/lists/${listName}`).subscribe(() => {
      this.fetchAll();
    });
  }
}
