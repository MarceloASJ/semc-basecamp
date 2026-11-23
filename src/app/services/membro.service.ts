import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MembroSemc, ViaCepResponse } from '../models/membro-semc.model';

@Injectable({
  providedIn: 'root'
})
export class MembroService {
  private readonly apiUrl = 'http://localhost:3000/membros';
  private readonly storageKey = 'semc_membro_logado';

  private membroLogadoSubject = new BehaviorSubject<MembroSemc | null>(this.carregarSessao());
  membroLogado$ = this.membroLogadoSubject.asObservable();

  constructor(private http: HttpClient) {}

  private carregarSessao(): MembroSemc | null {
    const salvo = localStorage.getItem(this.storageKey);
    return salvo ? JSON.parse(salvo) : null;
  }

  listarTodos(): Observable<MembroSemc[]> {
    return this.http.get<MembroSemc[]>(this.apiUrl);
  }

  cadastrar(membro: Omit<MembroSemc, 'id'>): Observable<MembroSemc> {
    return this.http.post<MembroSemc>(this.apiUrl, membro);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarCep(cep: string): Observable<ViaCepResponse> {
    const cepLimpo = cep.replace(/\D/g, '');
    return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  }

  autenticar(email: string, senha: string): Observable<MembroSemc | null> {
    return this.http
      .get<MembroSemc[]>(`${this.apiUrl}?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`)
      .pipe(
        map(membros => (membros.length > 0 ? membros[0] : null)),
        tap(membro => {
          if (membro) {
            localStorage.setItem(this.storageKey, JSON.stringify(membro));
            this.membroLogadoSubject.next(membro);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.membroLogadoSubject.next(null);
  }
}
