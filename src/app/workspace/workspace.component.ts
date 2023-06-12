import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from '../models/list.model';
import { AsyncPipe, Location, NgIf } from '@angular/common';
import { ListsViewComponent } from '../shared/lists-view/lists-view.component';
import { ListCreator } from '../shared/list-creator/list-creator.component';
import { ListTypesEnum } from '../models/list-type.enum';
import { ListsService } from '../services/lists.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    ListsViewComponent,
    ListCreator,
  ],
  template: `
    <ng-container *ngIf="(list | async) as vmList">
      <h1>
        <span>
          <button mat-icon-button (click)="onGoBack()">
            <mat-icon>arrow_back</mat-icon>
          </button>
        </span>
        <span>{{ vmList.title }}</span>
      </h1>
      <app-list-creator [type]="creatorType" [parentListName]="vmList.name">
        Add Pages
      </app-list-creator>
      <app-lists-view [lists]="children | async"></app-lists-view>
    </ng-container>
  `,
})
export class WorkspaceComponent implements OnInit {
  creatorType: ListTypesEnum = ListTypesEnum.PAGE;
  list: Observable<List> = this.lService.list$;
  children: Observable<List[]> = this.lService.lists$;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location,
    public lService: ListsService
  ) {}

  ngOnInit(): void {
    const listName = this.route.snapshot.params['name'];
    this.lService.fetch(listName);
  }

  onGoBack() {
    this.location.back();
  }
}
