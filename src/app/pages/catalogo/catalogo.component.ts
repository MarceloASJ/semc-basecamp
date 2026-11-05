import { Component, OnInit } from '@angular/core';
import { ItemSemc } from '../../models/item-semc.model';
import { SemcService } from '../../services/semc.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  itensFiltrados: ItemSemc[] = [];
  itemSelecionado?: ItemSemc;

  termoPesquisa: string = '';
  filtroTipo: string = 'Todos';
  mensagemFeedback: string = '';

  constructor(private semcService: SemcService) {}

  ngOnInit(): void {
    this.atualizarLista();
    if (this.itensFiltrados.length > 0) {
      this.itemSelecionado = this.itensFiltrados[0];
    }
  }

  atualizarLista(): void {
    this.itensFiltrados = this.semcService.pesquisar(this.termoPesquisa, this.filtroTipo);
  }

  definirFiltroTipo(tipo: string): void {
    this.filtroTipo = tipo;
    this.atualizarLista();
  }

  selecionarItem(item: ItemSemc): void {
    this.itemSelecionado = item;
  }

  excluirItem(id: number, nome: string): void {
    const confirmou = window.confirm(`Deseja realmente remover "${nome}" do catálogo SEMC?`);
    if (confirmou) {
      this.semcService.excluir(id);
      this.mensagemFeedback = `Item "${nome}" removido com sucesso do inventário!`;
      this.atualizarLista();
      this.itemSelecionado = this.itensFiltrados.length > 0 ? this.itensFiltrados[0] : undefined;
      setTimeout(() => (this.mensagemFeedback = ''), 4000);
    }
  }
}