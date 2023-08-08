import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'alunos', loadChildren: () => import('./components/alunos-list/alunos-list.module').then(m => m.AlunosListModule) },
  { path: 'alunos-form', loadChildren: () => import('./components/alunos-form/alunos-form.module').then(m => m.AlunosFormModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
