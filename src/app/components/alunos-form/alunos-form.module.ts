import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AlunosFormComponent } from './alunos-form.component';

@NgModule({
  declarations: [AlunosFormComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule.forChild([{ path: '', component: AlunosFormComponent }])
  ]
})
export class AlunosFormModule { }
