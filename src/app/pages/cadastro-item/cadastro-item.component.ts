import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SemcService } from '../../services/semc.service';

@Component({
  selector: 'app-cadastro-item',
  templateUrl: './cadastro-item.component.html',
  styleUrls: ['./cadastro-item.component.css']
})
export class CadastroItemComponent implements OnInit {
  idEdicao: number | null = null;
  modoEdicao: boolean = false;

  codigo: string = 'EQP-055';
  nome: string = '';
  tipo: 'Equipamento' | 'Trilha' = 'Equipamento';
  categoria: string = 'Cutelaria & Fogo';
  pesoGramas: number = 450;
  dificuldadeOuCriticidade: 'Essencial (EDC)' | 'Moderada' | 'Difícil' | 'Leve' = 'Essencial (EDC)';
  status: 'Disponível' | 'Em Campo' | 'Planejado' | 'Concluído' = 'Disponível';
  localOuResponsavel: string = 'Marcelo Alexandrino de Souza Junior';
  descricao: string = '';
  checklistTexto: string = 'Bainha tática em Kydex\nPederneira de ferrocério\nCordame Paracord 550';
  destaque: boolean = true;

  mensagemErro: string = '';

  constructor(
    private semcService: SemcService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const itemExistente = this.semcService.buscarPorId(id);
      if (itemExistente) {
        this.idEdicao = id;
        this.modoEdicao = true;
        this.codigo = itemExistente.codigo;
        this.nome = itemExistente.nome;
        this.tipo = itemExistente.tipo;
        this.categoria = itemExistente.categoria;
        this.pesoGramas = itemExistente.pesoGramas;
        this.dificuldadeOuCriticidade = itemExistente.dificuldadeOuCriticidade;
        this.status = itemExistente.status;
        this.localOuResponsavel = itemExistente.localOuResponsavel;
        this.descricao = itemExistente.descricao;
        this.checklistTexto = itemExistente.checklist.join('\n');
        this.destaque = itemExistente.destaque;
      }
    }
  }

  salvarFormulario(): void {
    if (!this.nome.trim() || !this.codigo.trim() || !this.descricao.trim()) {
      this.mensagemErro = 'Por favor, preencha todos os campos obrigatórios (Código, Nome e Descrição).';
      return;
    }

    const listaChecklist = this.checklistTexto
      .split('\n')
      .map(linha => linha.trim())
      .filter(linha => linha.length > 0);

    const dadosItem = {
      codigo: this.codigo.trim(),
      nome: this.nome.trim(),
      tipo: this.tipo,
      categoria: this.categoria.trim(),
      pesoGramas: Number(this.pesoGramas) || 0,
      dificuldadeOuCriticidade: this.dificuldadeOuCriticidade,
      status: this.status,
      localOuResponsavel: this.localOuResponsavel.trim(),
      descricao: this.descricao.trim(),
      checklist: listaChecklist.length > 0 ? listaChecklist : ['Item padrão verificado pelo SEMC'],
      destaque: this.destaque
    };

    if (this.modoEdicao && this.idEdicao !== null) {
      this.semcService.atualizar(this.idEdicao, dadosItem);
    } else {
      this.semcService.cadastrar(dadosItem);
    }

    this.router.navigate(['/catalogo']);
  }

  limparCampos(): void {
    this.nome = '';
    this.descricao = '';
    this.checklistTexto = '';
    this.mensagemErro = '';
  }
}