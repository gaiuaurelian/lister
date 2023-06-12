import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { List } from 'src/app/models/list.model';
import { ListViewItemComponent } from '../list-view-item/list-view-item.component';

@Component({
  selector: 'app-lists-view',
  standalone: true,
  imports: [NgIf, NgFor, MatListModule, ListViewItemComponent],
  template: `
    <div *ngIf="!lists || !lists.length">
      <p>Nothing to see here yet!</p>
      <p>Please create a new list</p>
    </div>
    <mat-list role="list" *ngIf="lists">
      <mat-list-item role="listitem" *ngFor="let list of lists">
        <app-list-view-item [list]="list"></app-list-view-item>
      </mat-list-item>
    </mat-list>
  `,
})
export class ListsViewComponent {
  @Input()
  lists: List[] | null = null;

  constructor() {}
}
