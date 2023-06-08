import { NgIf } from '@angular/common';
import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { ListsService } from 'src/app/services/lists.service';
import { ListTypesEnum } from 'src/app/models/list-type.enum';
import { RouterLink } from '@angular/router';
import { isNavigationList as isNavigationListType } from 'src/app/utils/list.utils';

@Pipe({
  name: 'isNavigationLink',
  standalone: true,
})
export class IsNavigationLinkPipe implements PipeTransform {
  transform(value: ListTypesEnum, ...args: any[]): boolean {
    return isNavigationListType(value);
  }
}

@Pipe({
  name: 'buildNavigationLink',
  standalone: true,
})
export class BuildNavigationLinkPipe implements PipeTransform {
  transform(value: List, ...args: any[]): any {
    let navigationType = 'UNDEFINED_NAVIGATION_TYPE';
    if (isNavigationListType(value.type)) {
      navigationType = value.type.toLowerCase();
    }

    return `${navigationType}/${value.name}`;
  }
}

@Component({
  selector: 'app-list-view-item',
  standalone: true,
  imports: [RouterLink, NgIf, IsNavigationLinkPipe, BuildNavigationLinkPipe],
  template: ` <span *ngIf="list.type | isNavigationLink">
      <a [routerLink]="['/' + (list | buildNavigationLink)]">
        {{ list.title }}
      </a>
    </span>
    <span *ngIf="!(list.type | isNavigationLink)">{{ list.title }}</span>
    <button (click)="onRemove()">Remove</button>`,
})
export class ListViewItemComponent {
  @Input() list!: List;

  constructor(private readonly lService: ListsService) {}

  onRemove() {
    this.lService.remove(this.list.name);
  }
}
