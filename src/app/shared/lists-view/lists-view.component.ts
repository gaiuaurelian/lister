import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { ListViewItemComponent } from '../list-view-item/list-view-item.component';

@Component({
  selector: 'app-lists-view',
  standalone: true,
  imports: [NgIf, NgFor, ListViewItemComponent],
  template: `
    <div *ngIf="!lists || !lists.length">
      <p>Nothing to see here yet!</p>
      <p>Please create a new list</p>
    </div>
    <ul *ngIf="lists">
      <li *ngFor="let list of lists">
        <app-list-view-item [list]="list"></app-list-view-item>
      </li>
    </ul>
  `,
})
export class ListsViewComponent {
  @Input()
  lists: List[] | null = null;

  constructor() {}
}
