import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../components/alunos-list/interfaces/aluno.interface';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'https://api-teste-laserchip-2023-200528dc7097.herokuapp.com';

  constructor(private http: HttpClient) {}

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/alunos`);
  }

  criarAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(`${this.apiUrl}/alunos`, aluno);
  }

  atualizarAluno(id: number, aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/alunos/${id}`, aluno);
  }

  deletarAluno(id: number): Observable<Aluno> {
    return this.http.delete<Aluno>(`${this.apiUrl}/alunos/${id}`);
  }
}
