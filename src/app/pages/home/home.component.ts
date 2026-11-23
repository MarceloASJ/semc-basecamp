import { Component, OnInit } from '@angular/core';
import { ItemSemc } from '../../models/item-semc.model';
import { SemcService } from '../../services/semc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  destaques: ItemSemc[] = [];
  resumo = { totalEquipamentos: 0, totalTrilhas: 0, pesoTotalKitKg: 0 };
  carregando = true;
  erroApi = '';

  regrasSobrevivencia = [
    { numero: '01', titulo: 'Corte (Lâmina Full Tang)', detalhe: 'Faca principal em aço carbono 1095 para madeira, abrigo e preparo.' },
    { numero: '02', titulo: 'Combustão (Fogo Garantido)', detalhe: 'Pederneira de ferrocério, isca impermeável e isqueiro sobressalente.' },
    { numero: '03', titulo: 'Cobertura (Abrigo Tático)', detalhe: 'Barraca 4 estações, tarp impermeável e manta térmica aluminizada.' },
    { numero: '04', titulo: 'Recipiente & Água', detalhe: 'Cantil em inox de parede simples (para ferver água) e filtro portátil.' },
    { numero: '05', titulo: 'Cordame & Primeiros Socorros', detalhe: 'Paracord 550 (mínimo 15m) e kit trauma individual IFAK completo.' }
  ];

  constructor(private semcService: SemcService) {}

  ngOnInit(): void {
    this.semcService.listarDestaques().subscribe({
      next: (itens: ItemSemc[]) => {
        this.destaques = itens;
      },
      error: () => {
        this.erroApi = 'Não foi possível conectar à API local (json-server em http://localhost:3000).';
      }
    });

    this.semcService.listarTodos().subscribe({
      next: (todos: ItemSemc[]) => {
        this.resumo = this.semcService.calcularResumo(todos);
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
      }
    });
  }
}
