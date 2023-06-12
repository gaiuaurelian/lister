import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/workspaces', pathMatch: 'full' },
  {
    path: 'workspaces',
    loadChildren: () => import('./workspaces/workspaces.routes'),
  },
];
