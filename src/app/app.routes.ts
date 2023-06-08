import { Routes } from '@angular/router';
import { listDataResolver } from './resolvers/list-data.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'workspace/:name',
    loadComponent: () =>
      import('./workspace/workspace.component').then(
        (m) => m.WorkspaceComponent
      ),
    resolve: { listData: listDataResolver },
  },
];
