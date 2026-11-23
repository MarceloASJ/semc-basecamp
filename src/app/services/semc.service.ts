import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemSemc } from '../models/item-semc.model';

@Injectable({
  providedIn: 'root'
})
export class SemcService {
  private readonly apiUrl = 'http://localhost:3000/itens';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<ItemSemc[]> {
    return this.http.get<ItemSemc[]>(this.apiUrl);
  }

  listarDestaques(): Observable<ItemSemc[]> {
    return this.http.get<ItemSemc[]>(`${this.apiUrl}?destaque=true`);
  }

  buscarPorId(id: number): Observable<ItemSemc> {
    return this.http.get<ItemSemc>(`${this.apiUrl}/${id}`);
  }

  pesquisar(termo: string, filtroTipo: string): Observable<ItemSemc[]> {
    const termoLimpo = termo.trim().toLowerCase();
    return this.listarTodos().pipe(
      map(itens =>
        itens.filter(item => {
          const correspondeTipo =
            filtroTipo === 'Todos' ||
            item.tipo === filtroTipo ||
            item.categoria.toLowerCase().includes(filtroTipo.toLowerCase());

          const correspondeTermo =
            !termoLimpo ||
            item.nome.toLowerCase().includes(termoLimpo) ||
            item.codigo.toLowerCase().includes(termoLimpo) ||
            item.categoria.toLowerCase().includes(termoLimpo) ||
            item.localOuResponsavel.toLowerCase().includes(termoLimpo);

          return correspondeTipo && correspondeTermo;
        })
      )
    );
  }

  cadastrar(novoItem: Omit<ItemSemc, 'id'>): Observable<ItemSemc> {
    return this.http.post<ItemSemc>(this.apiUrl, novoItem);
  }

  atualizar(id: number, itemAtualizado: Omit<ItemSemc, 'id'>): Observable<ItemSemc> {
    return this.http.put<ItemSemc>(`${this.apiUrl}/${id}`, { ...itemAtualizado, id });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  calcularResumo(itens: ItemSemc[]): {
    totalEquipamentos: number;
    totalTrilhas: number;
    pesoTotalKitKg: number;
  } {
    const equipamentos = itens.filter(i => i.tipo === 'Equipamento');
    const trilhas = itens.filter(i => i.tipo === 'Trilha');
    const somaPesoEquipamentos = equipamentos.reduce((acc, cur) => acc + Number(cur.pesoGramas || 0), 0);

    return {
      totalEquipamentos: equipamentos.length,
      totalTrilhas: trilhas.length,
      pesoTotalKitKg: Number((somaPesoEquipamentos / 1000).toFixed(2))
    };
  }
}
