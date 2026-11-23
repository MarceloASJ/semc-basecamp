import { Component, OnInit } from '@angular/core';
import { ItemSemc } from '../../models/item-semc.model';
import { MembroSemc } from '../../models/membro-semc.model';
import { SemcService } from '../../services/semc.service';
import { MembroService } from '../../services/membro.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  itens: ItemSemc[] = [];
  totalMembros = 0;
  resumo = { totalEquipamentos: 0, totalTrilhas: 0, pesoTotalKitKg: 0 };
  porDificuldade: { nivel: string; quantidade: number }[] = [];
  erroApi = '';

  constructor(
    private semcService: SemcService,
    private membroService: MembroService
  ) {}

  ngOnInit(): void {
    this.semcService.listarTodos().subscribe({
      next: (itens: ItemSemc[]) => {
        this.itens = itens;
        this.resumo = this.semcService.calcularResumo(itens);

        const mapa = new Map<string, number>();
        for (const item of itens) {
          mapa.set(item.dificuldadeOuCriticidade, (mapa.get(item.dificuldadeOuCriticidade) || 0) + 1);
        }
        this.porDificuldade = Array.from(mapa.entries()).map(([nivel, quantidade]) => ({ nivel, quantidade }));
      },
      error: () => {
        this.erroApi = 'Não foi possível carregar os indicadores do json-server.';
      }
    });

    this.membroService.listarTodos().subscribe({
      next: (membros: MembroSemc[]) => (this.totalMembros = membros.length),
      error: () => {}
    });
  }
}
