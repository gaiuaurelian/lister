export default [
  {
    path: '',
    loadComponent: () =>
      import('./workspaces.component').then((m) => m.WorkspacesComponent),
  },
  {
    path: 'list/:name',
    loadChildren: () => import('./../workspace/workspace.routes'),
  },
];
