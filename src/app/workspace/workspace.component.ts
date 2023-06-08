import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from '../models/list.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [NgIf],
  template: ` <h1 *ngIf="list">{{ list.title }}</h1> `,
})
export class WorkspaceComponent implements OnInit {
  list: List | null = null;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.list = this.route.snapshot.data['listData'];
  }
}
