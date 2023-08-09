import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { Aluno } from './interfaces/aluno.interface';
import { AlunoService } from 'src/app/services/aluno.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alunos-list',
  templateUrl: './alunos-list.component.html',
  styleUrls: ['./alunos-list.component.scss'],
})
export class AlunosListComponent implements OnInit {
  alunos: Aluno[] = [];
  alunosPaginados: Aluno[] = [];
  displayedColumns: string[] = [
    'nome',
    'sobrenome',
    'idade',
    'sexo',
    'actions',
  ];

  pageSize: number = 10;
  pageIndex: number = 0;
  lowValue: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    public dialog: MatDialog,
    private alunoService: AlunoService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAlunos();
  }

  getAlunos(): void {
    this.alunoService.getAlunos().subscribe((alunos) => {
      this.alunos = alunos;
      this.updatePage();
    });
  }

  updatePage(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.alunosPaginados = this.alunos.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  deletarAluno(id: number): void {
    const confirmacao = window.confirm(
      `Tem certeza que deseja deletar este aluno?`
    );

    if (confirmacao) {
      this.alunoService.deletarAluno(id).subscribe(() => {
        this.alunos = this.alunos.filter((aluno) => aluno.id !== id);
        this.getAlunos();

        this.snackBar.open('Aluno deletado com sucesso!', 'Fechar', {
          duration: 2000,
        });
      });
    }
  }

  filtrarAlunos(event: any): void {
    const texto = event.target.value.trim().toLowerCase();
    this.alunosPaginados = this.alunos.filter((aluno) => {
      return (
        aluno.nome.toLowerCase().includes(texto) ||
        aluno.sobrenome.toLowerCase().includes(texto) ||
        aluno.idade.toString().includes(texto) ||
        aluno.sexo.toLowerCase().includes(texto)
      );
    });
  }

  openDialog(aluno?: any): void {
    const dialogRef = this.dialog.open(AlunoFormComponent, {
      width: '720px',
      data: { aluno },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAlunos();
    });
  }

  onClose(): void {
    this.dialog.closeAll();
  }
}
