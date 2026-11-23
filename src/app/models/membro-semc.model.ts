export interface MembroSemc {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  ddd: string;
  telefone: string;
  nivelExperiencia: 'Iniciante' | 'Intermediário' | 'Avançado';
  perfil: 'Membro' | 'Administrador';
}

export interface ViaCepResponse {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  ddd?: string;
  erro?: boolean;
}
