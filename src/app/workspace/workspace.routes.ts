export default [
  {
    path: '',
    loadComponent: () =>
      import('./workspace.component').then((m) => m.WorkspaceComponent),
  },
  {
    path: 'list/:name',
    loadChildren: () => import('./../workspace/workspace.routes'),
  },
];
