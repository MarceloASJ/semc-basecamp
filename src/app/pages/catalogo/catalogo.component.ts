import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  buscaControl = new FormControl('');
  filtroTipo = 'Todos';
  mensagemFeedback = '';
  erroApi = '';

  constructor(private semcService: SemcService) {}

  ngOnInit(): void {
    this.atualizarLista(true);

    this.buscaControl.valueChanges.subscribe(() => {
      this.atualizarLista(false);
    });
  }

  atualizarLista(selecionarPrimeiro = false): void {
    const termo = this.buscaControl.value || '';
    this.erroApi = '';

    this.semcService.pesquisar(termo, this.filtroTipo).subscribe({
      next: (itens: ItemSemc[]) => {
        this.itensFiltrados = itens;
        if (selecionarPrimeiro && itens.length > 0) {
          this.itemSelecionado = itens[0];
        } else if (this.itemSelecionado && !itens.some(i => i.id === this.itemSelecionado?.id)) {
          this.itemSelecionado = itens.length > 0 ? itens[0] : undefined;
        }
      },
      error: () => {
        this.erroApi = 'Erro ao buscar dados no json-server (verifique se a API está rodando na porta 3000).';
      }
    });
  }

  definirFiltroTipo(tipo: string): void {
    this.filtroTipo = tipo;
    this.atualizarLista(false);
  }

  selecionarItem(item: ItemSemc): void {
    this.itemSelecionado = item;
  }

  excluirItem(id: number, nome: string): void {
    const confirmou = window.confirm(`Deseja realmente remover "${nome}" do catálogo SEMC?`);
    if (confirmou) {
      this.semcService.excluir(id).subscribe({
        next: () => {
          this.mensagemFeedback = `Item "${nome}" removido com sucesso da base de dados!`;
          this.atualizarLista(true);
          setTimeout(() => (this.mensagemFeedback = ''), 4000);
        },
        error: () => {
          this.erroApi = 'Falha ao excluir o item na Web API.';
        }
      });
    }
  }
}
