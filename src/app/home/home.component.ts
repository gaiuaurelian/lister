import { Component, OnInit } from '@angular/core';
import { ListsViewComponent } from '../shared/lists-view/lists-view.component';
import { ListsService } from '../services/lists.service';
import { AsyncPipe } from '@angular/common';
import { ListCreator } from '../shared/list-creator/list-creator.component';
import { ListTypesEnum } from '../models/list-type.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, ListsViewComponent, ListCreator],
  template: `
    <h1>This is Home</h1>
    <app-list-creator [type]="creatorType">Create your workspace</app-list-creator>
    <app-lists-view [lists]="lService.lists$ | async"></app-lists-view>
  `,
})
export class HomeComponent implements OnInit {
  creatorType: ListTypesEnum = ListTypesEnum.WORKSPACE;
  constructor(public lService: ListsService) {}

  ngOnInit() {}
}
