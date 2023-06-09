import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from '../models/list.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { ListsViewComponent } from '../shared/lists-view/lists-view.component';
import { ListCreator } from '../shared/list-creator/list-creator.component';
import { ListTypesEnum } from '../models/list-type.enum';
import { ListsService } from '../services/lists.service';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [NgIf, AsyncPipe, ListsViewComponent, ListCreator],
  template: `
    <ng-container *ngIf="list">
      <h1>
        <span><button (click)="onGoBack()">Go back</button></span>
        <span>{{ list.title }}</span>
      </h1>
      <app-list-creator [type]="creatorType">
        Add Pages
      </app-list-creator>
      <app-lists-view [lists]="list.items"></app-lists-view>
    </ng-container>
  `,
})
export class WorkspaceComponent implements OnInit {
  creatorType: ListTypesEnum = ListTypesEnum.PAGE;
  list: List | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    public lService: ListsService
  ) {}

  ngOnInit(): void {
    this.list = this.route.snapshot.data['listData'];
    this.lService.fetchAll();
  }

  onGoBack() {
    this.router.navigate(['/home']);
  }
}
