import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-list-view-item',
  standalone: true,
  template: ` <span> {{ list.title }}</span>
    <button (click)="onRemove()">Remove</button>`,
})
export class ListViewItemComponent {
  @Input() list!: List;

  constructor(private readonly lService: ListsService) {}

  onRemove() {
    this.lService.remove(this.list.name);
  }
}
