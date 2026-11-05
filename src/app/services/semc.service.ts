import { Injectable } from '@angular/core';
import { ItemSemc } from '../models/item-semc.model';
import { ITENS_SEMC_MOCK } from '../mocks/itens-semc.mock';

@Injectable({
  providedIn: 'root'
})
export class SemcService {
  private itens: ItemSemc[] = [...ITENS_SEMC_MOCK];

  constructor() {}

  // Listar todos os registos (Equipamentos e Trilhas)
  listarTodos(): ItemSemc[] {
    return [...this.itens];
  }

  // Listar apenas itens em destaque para a página Home
  listarDestaques(): ItemSemc[] {
    return this.itens.filter(item => item.destaque);
  }

  // Procurar item específico por ID (Componente de Detalhe / Edição)
  buscarPorId(id: number): ItemSemc | undefined {
    const encontrado = this.itens.find(item => item.id === id);
    return encontrado ? { ...encontrado, checklist: [...encontrado.checklist] } : undefined;
  }

  // Pesquisar e filtrar itens por termo de texto e tipo/categoria
  pesquisar(termo: string, filtroTipo: string): ItemSemc[] {
    const termoLimpo = termo.trim().toLowerCase();
    return this.itens.filter(item => {
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
    });
  }

  // Registar novo Equipamento ou Trilha
  cadastrar(novoItem: Omit<ItemSemc, 'id'>): ItemSemc {
    const novoId = this.itens.length > 0 ? Math.max(...this.itens.map(i => i.id)) + 1 : 1;
    const itemCriado: ItemSemc = {
      ...novoItem,
      id: novoId
    };
    this.itens.unshift(itemCriado);
    return itemCriado;
  }

  // Atualizar Equipamento ou Trilha existente
  atualizar(id: number, itemAtualizado: Omit<ItemSemc, 'id'>): boolean {
    const index = this.itens.findIndex(item => item.id === id);
    if (index !== -1) {
      this.itens[index] = { ...itemAtualizado, id };
      return true;
    }
    return false;
  }

  // Excluir registo por ID
  excluir(id: number): boolean {
    const tamanhoInicial = this.itens.length;
    this.itens = this.itens.filter(item => item.id !== id);
    return this.itens.length < tamanhoInicial;
  }

  // Obter estatísticas resumidas para os indicadores do sistema
  obterResumo(): { totalEquipamentos: number; totalTrilhas: number; pesoTotalKitKg: number } {
    const equipamentos = this.itens.filter(i => i.tipo === 'Equipamento');
    const trilhas = this.itens.filter(i => i.tipo === 'Trilha');
    const somaPesoEquipamentos = equipamentos.reduce((acc, cur) => acc + cur.pesoGramas, 0);

    return {
      totalEquipamentos: equipamentos.length,
      totalTrilhas: trilhas.length,
      pesoTotalKitKg: Number((somaPesoEquipamentos / 1000).toFixed(2))
    };
  }
}