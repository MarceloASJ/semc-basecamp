export interface ItemSemc {
  id: number;
  codigo: string;
  nome: string;
  tipo: 'Equipamento' | 'Trilha';
  categoria: string;
  pesoGramas: number;
  dificuldadeOuCriticidade: 'Essencial (EDC)' | 'Moderada' | 'Difícil' | 'Leve';
  status: 'Disponível' | 'Em Campo' | 'Planejado' | 'Concluído';
  localOuResponsavel: string;
  descricao: string;
  checklist: string[];
  destaque: boolean;
}