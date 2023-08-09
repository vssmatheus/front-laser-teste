import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'alunos',
    loadChildren: () =>
      import('./components/alunos-list/alunos-list.module').then(
        (m) => m.AlunosListModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (m) => m.DasboardModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'alunos',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
