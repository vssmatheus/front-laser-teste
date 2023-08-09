import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Aluno } from '../alunos-list/interfaces/aluno.interface';
import { AlunoService } from 'src/app/services/aluno.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('doughnutCanvas', { static: false }) private doughnutCanvas:
    | ElementRef
    | undefined;
  public totalHomens: number = 0;
  public totalMulheres: number = 0;
  homensAcima18: number = 0;
  mulheresAcima18: number = 0;
  pessoasAbaixo18: number = 0;
  alunos: Aluno[] = [];

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.alunoService
      .getAlunos()
      .pipe(
        tap((alunos) => {
          this.totalHomens = alunos.filter(
            (aluno) => aluno.sexo === 'M'
          ).length;
          this.totalMulheres = alunos.filter(
            (aluno) => aluno.sexo === 'F'
          ).length;

          this.homensAcima18 = alunos.filter(
            (pessoa) => pessoa.sexo === 'M' && pessoa.idade > 18
          ).length;
          this.mulheresAcima18 = alunos.filter(
            (pessoa) => pessoa.sexo === 'F' && pessoa.idade > 18
          ).length;
          this.pessoasAbaixo18 = alunos.filter(
            (pessoa) => pessoa.idade < 18
          ).length;
        })
      )
      .subscribe(
        () => {
          this.createDoughnutChart();
          this.createIdadeBarChart();
        },
        (error) => {
          console.error('Erro ao obter os dados da API:', error);
        }
      );
  }

  createDoughnutChart() {
    if (this.doughnutCanvas) {
      const doughnutCanvas = this.doughnutCanvas.nativeElement;
      const ctx = doughnutCanvas.getContext('2d');

      const doughnutData = [this.totalHomens, this.totalMulheres];
      const doughnutLabels = ['Homens', 'Mulheres'];
      const colors = ['#4087e4', '#e771ff'];

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: doughnutLabels,
          datasets: [
            {
              data: doughnutData,
              backgroundColor: colors,
            },
          ],
        },
      });
    }
  }

  createIdadeBarChart() {
    const ctx = document.getElementById('idadeBarChart') as HTMLCanvasElement;
    const idadeData = [this.totalHomens, this.totalMulheres];

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Homens', 'Mulheres'],
        datasets: [
          {
            data: idadeData,
            backgroundColor: ['#4087e4', '#e771ff'],
          },
        ],
      },
    });
  }
}
