import { Component, OnInit } from '@angular/core';
import { ListsViewComponent } from '../shared/lists-view/lists-view.component';
import { ListsService } from '../services/lists.service';
import { AsyncPipe } from '@angular/common';
import { ListCreator } from '../shared/list-creator/list-creator.component';
import { ListTypesEnum } from '../models/list-type.enum';
import { ActivatedRoute } from '@angular/router';
import { List } from '../models/list.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, ListsViewComponent, ListCreator],
  template: `
    <h1>Workspaces</h1>
    <app-list-creator [type]="creatorType">
      Create your workspace</app-list-creator
    >
    <app-lists-view [lists]="children | async"></app-lists-view>
  `,
})
export class WorkspacesComponent implements OnInit {
  creatorType: ListTypesEnum = ListTypesEnum.WORKSPACE;
  children: Observable<List[]> = this.lService.lists$;

  constructor(
    private readonly route: ActivatedRoute,
    public lService: ListsService
  ) {}

  ngOnInit() {
    this.lService.fetch();
  }
}
