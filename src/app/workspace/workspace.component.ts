import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workspace',
  template: `
    <h1>Workspace name</h1>
  `
})

export class WorkspaceComponent {
  constructor(private readonly route: ActivatedRoute) {}
}
