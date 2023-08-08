import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlunoService } from 'src/app/services/aluno.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss'],
})
export class AlunoFormComponent implements OnInit {
  aluno: any = {};
  modoEdicao: boolean = false;

  constructor(
    private alunoService: AlunoService,
    private dialogRef: MatDialogRef<AlunoFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.aluno) {
      this.aluno = { ...data.aluno };
      this.modoEdicao = true;
    }
  }

  ngOnInit(): void {
    if (this.data.aluno) {
      this.aluno = { ...this.data.aluno };
    }
  }

  adicionarAluno(): void {
    this.alunoService.criarAluno(this.aluno).subscribe(
      (aluno) => {
        this.snackBar.open('Aluno adicionado com sucesso!', 'Fechar', {
          duration: 2000,
        });
        this.dialogRef.close();
      },
      (error) => {
        console.error('Erro ao adicionar aluno:', error);
      }
    );
  }

  private atualizarAluno(id: number): void {
    this.alunoService.atualizarAluno(id, this.aluno).subscribe(
      (response) => {
        this.snackBar.open('Aluno Atualizado com sucesso!', 'Fechar', {
          duration: 2000,
        });
        this.dialogRef.close();
      },
      (error) => {
        console.error('Erro au atualizar alunos', error);
      }
    );
  }

  adicionarOuEditarAluno(): void {
    if (this.modoEdicao) {
      this.atualizarAluno(this.aluno.id);
    } else {
      this.adicionarAluno();
    }
  }

  closeDialog(): void {
    this.dialogRef.close(this.aluno);
  }
}
