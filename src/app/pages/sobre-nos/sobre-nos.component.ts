import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.component.html',
  styleUrls: ['./sobre-nos.component.css']
})
export class SobreNosComponent {
  pilares = [
    {
      titulo: '1. Preparo Técnico & EDC',
      descricao: 'Seleção rigorosa de equipamentos testados em campo (cutelaria, abrigo, filtragem de água e comunicação VHF).'
    },
    {
      titulo: '2. Autossuficiência no Mato',
      descricao: 'Domínio de técnicas de bushcraft, orientação por carta topográfica e bússola, nós táticos e primeiros socorros.'
    },
    {
      titulo: '3. Irmandade & Trilha Limpa',
      descricao: 'Aplicação estrita do princípio Leave No Trace (não deixe rastros), segurança coletiva e preservação das serras de MG.'
    }
  ];

  marcosHistoricos = [
    { ano: '2024', evento: 'Fundação do grupo SEMC e realização dos primeiros acampamentos técnicos e travessias em Minas Gerais.' },
    { ano: '2025', evento: 'Criação da identidade visual oficial (insígnias de montanha SEMC e mascote tático) e padronização de kits EDC.' },
    { ano: '2026', evento: 'Desenvolvimento da aplicação web SEMC BaseCamp em Angular na disciplina de Desenvolvimento Web Front-End (FUMEC).' }
  ];
}