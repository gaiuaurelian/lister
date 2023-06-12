import { NgIf } from '@angular/common';
import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { ListsService } from 'src/app/services/lists.service';
import { ListTypesEnum } from 'src/app/models/list-type.enum';
import { RouterLink } from '@angular/router';
import { isNavigationList as isNavigationListType } from 'src/app/utils/list.utils';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Pipe({
  name: 'isNavigationLink',
  standalone: true,
})
export class IsNavigationLinkPipe implements PipeTransform {
  transform(value: ListTypesEnum, ...args: any[]): boolean {
    return isNavigationListType(value);
  }
}

@Component({
  selector: 'app-list-view-item',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    NgIf,
    IsNavigationLinkPipe,
  ],
  template: `
    <ng-container *ngIf="list">
      <span *ngIf="list.type | isNavigationLink">
        <a [routerLink]="['list/' + list.name]">
          [{{ list.type.toString() }}] {{ list.title }}
        </a>
      </span>
      <span *ngIf="!(list.type | isNavigationLink)">
        [{{ list.type.toString() }}] {{ list.title }}
      </span>
      <button color="primary" mat-icon-button (click)="onRemove()">
        <mat-icon>delete</mat-icon>
      </button>
    </ng-container>
  `,
})
export class ListViewItemComponent {
  @Input() list!: List;

  constructor(private readonly lService: ListsService) {}

  onRemove() {
    this.lService.remove(this.list.name);
  }
}
