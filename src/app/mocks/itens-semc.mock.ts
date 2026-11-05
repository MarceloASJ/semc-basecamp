import { ItemSemc } from '../models/item-semc.model';

export const ITENS_SEMC_MOCK: ItemSemc[] = [
  {
    id: 1,
    codigo: 'EQP-014',
    nome: 'Barraca Tática SEMC Storm 2P',
    tipo: 'Equipamento',
    categoria: 'Abrigo & Dormida',
    pesoGramas: 2100,
    dificuldadeOuCriticidade: 'Essencial (EDC)',
    status: 'Disponível',
    localOuResponsavel: 'Marcelo Alexandrino',
    descricao: 'Barraca de 4 estações com sobreteto impermeável Ripstop verde-oliva (coluna de água de 4.000 mm) e varetas em alumínio aeronáutico 7001.',
    checklist: [
      'Sobreteto impermeável Ripstop com costuras seladas',
      '2 Varetas de alumínio 7001 + 12 espeques em V',
      '6 Cordas refletivas de Paracord 550',
      'Lona de solo adicional (Footprint) anti-abrasão'
    ],
    destaque: true
  },
  {
    id: 2,
    codigo: 'EQP-021',
    nome: 'Faca Bushcraft Full Tang Aço 1095 — SEMC Edition',
    tipo: 'Equipamento',
    categoria: 'Cutelaria & Fogo',
    pesoGramas: 380,
    dificuldadeOuCriticidade: 'Essencial (EDC)',
    status: 'Disponível',
    localOuResponsavel: 'Marcelo Alexandrino',
    descricao: 'Lâmina de 5 mm em aço carbono 1095 com dorso de 90 graus para uso com pederneira, cabo em Micarta texturizada e bainha em Kydex.',
    checklist: [
      'Faca Full Tang Aço 1095 afiada',
      'Bainha Kydex com clip tático',
      'Pederneira de ferrocério acoplada',
      'Fiel de pulso em Paracord 550'
    ],
    destaque: true
  },
  {
    id: 3,
    codigo: 'EQP-033',
    nome: 'Mochila Modular Assault 45L Cordura 1000D',
    tipo: 'Equipamento',
    categoria: 'Transporte & Carga',
    pesoGramas: 1450,
    dificuldadeOuCriticidade: 'Essencial (EDC)',
    status: 'Em Campo',
    localOuResponsavel: 'Marcelo Alexandrino',
    descricao: 'Mochila tática de 45 litros com sistema MOLLE cortado a laser, compartimento para bolsa de hidratação de 3L e costado anatómico.',
    checklist: [
      'Capa de chuva impermeável camuflada',
      'Reservatório de hidratação CamelBak 3L',
      '2 Bolsos modulares laterais MOLLE',
      'Fitas de compressão para saco de dormir'
    ],
    destaque: false
  },
  {
    id: 4,
    codigo: 'EQP-042',
    nome: 'Kit Trauma Individual IFAK Primeiros Socorros',
    tipo: 'Equipamento',
    categoria: 'Primeiros Socorros',
    pesoGramas: 650,
    dificuldadeOuCriticidade: 'Essencial (EDC)',
    status: 'Disponível',
    localOuResponsavel: 'Base SEMC Contagem/BH',
    descricao: 'Kit de atendimento pré-hospitalar tático para trilhas remotas, contendo controlo de hemorragias, antissépticos e manta térmica.',
    checklist: [
      'Torniquete tático CAT Gen 7',
      'Bandagem israelita de emergência 4 polegadas',
      'Manta térmica aluminizada de sobrevivência',
      'Tesoura ponta romba + Gaze estéril + Luvas nitrílicas'
    ],
    destaque: true
  },
  {
    id: 5,
    codigo: 'TRL-101',
    nome: 'Travessia Serra do Cipó — Base SEMC',
    tipo: 'Trilha',
    categoria: 'Trilha Mapeada (24 km)',
    pesoGramas: 11850,
    dificuldadeOuCriticidade: 'Moderada',
    status: 'Concluído',
    localOuResponsavel: 'Santana do Riacho - MG',
    descricao: 'Expedição de 2 dias com montagem de acampamento bivak, purificação de água em curso natural e navegação topográfica com bússola.',
    checklist: [
      'Carta topográfica da Serra do Cipó + Bússola',
      'Filtro portátil Sawyer Mini + Pastilhas de cloro',
      'Rádio comunicador VHF/UHF carregado (Canal 7.12)',
      'Lanterna de cabeça (Headlamp) + Baterias extra'
    ],
    destaque: true
  },
  {
    id: 6,
    codigo: 'TRL-108',
    nome: 'Travessia Noturna Pico do Itambé (2.052 m)',
    tipo: 'Trilha',
    categoria: 'Trilha de Altitude (16 km)',
    pesoGramas: 10920,
    dificuldadeOuCriticidade: 'Difícil',
    status: 'Planejado',
    localOuResponsavel: 'Santo Antônio do Itambé - MG',
    descricao: 'Subida técnica ao ponto culminante da região com temperaturas baixas, exigindo vestuário em camadas (segunda pele, fleece e anorak).',
    checklist: [
      'Saco de dormir conforto 0°C + Isolante térmico R-Value 3.5',
      'Fogareiro a gás isobutano + Panela de titânio',
      'Anorak impermeável corta-vento + Luvas térmicas',
      'Ração liofilizada para 48 horas + Eletrólitos'
    ],
    destaque: false
  }
];