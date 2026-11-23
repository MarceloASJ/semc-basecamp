import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemSemc } from '../../models/item-semc.model';
import { SemcService } from '../../services/semc.service';

@Component({
  selector: 'app-cadastro-item',
  templateUrl: './cadastro-item.component.html',
  styleUrls: ['./cadastro-item.component.css']
})
export class CadastroItemComponent implements OnInit {
  formItem!: FormGroup;
  idEdicao: number | null = null;
  modoEdicao = false;
  enviando = false;
  erroApi = '';

  constructor(
    private fb: FormBuilder,
    private semcService: SemcService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formItem = this.fb.group({
      tipo: ['Equipamento', [Validators.required]],
      codigo: ['EQP-055', [Validators.required, Validators.minLength(4)]],
      status: ['Disponível', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['Cutelaria & Fogo', [Validators.required, Validators.minLength(2)]],
      pesoGramas: [450, [Validators.required, Validators.min(1)]],
      dificuldadeOuCriticidade: ['Essencial (EDC)', [Validators.required]],
      localOuResponsavel: ['Marcelo Alexandrino de Souza Junior', [Validators.required, Validators.minLength(2)]],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      checklistTexto: ['Bainha tática em Kydex\nPederneira de ferrocério\nCordame Paracord 550', [Validators.required]],
      destaque: [true]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.semcService.buscarPorId(id).subscribe({
        next: (item: ItemSemc) => {
          this.idEdicao = id;
          this.modoEdicao = true;
          this.formItem.patchValue({
            ...item,
            checklistTexto: item.checklist.join('\n')
          });
        },
        error: () => {
          this.erroApi = 'Não foi possível carregar os dados do item para edição.';
        }
      });
    }
  }

  campoInvalido(campo: string): boolean {
    const ctrl = this.formItem.get(campo);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  campoValido(campo: string): boolean {
    const ctrl = this.formItem.get(campo);
    return !!(ctrl && ctrl.valid && (ctrl.dirty || ctrl.touched));
  }

  salvarFormulario(): void {
    if (this.formItem.invalid) {
      this.formItem.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.erroApi = '';
    const v = this.formItem.value;

    const listaChecklist = String(v.checklistTexto || '')
      .split('\n')
      .map((l: string) => l.trim())
      .filter((l: string) => l.length > 0);

    const payload: Omit<ItemSemc, 'id'> = {
      codigo: String(v.codigo).trim(),
      nome: String(v.nome).trim(),
      tipo: v.tipo,
      categoria: String(v.categoria).trim(),
      pesoGramas: Number(v.pesoGramas),
      dificuldadeOuCriticidade: v.dificuldadeOuCriticidade,
      status: v.status,
      localOuResponsavel: String(v.localOuResponsavel).trim(),
      descricao: String(v.descricao).trim(),
      checklist: listaChecklist.length > 0 ? listaChecklist : ['Item verificado SEMC'],
      destaque: Boolean(v.destaque)
    };

    const requisicao$ =
      this.modoEdicao && this.idEdicao !== null
        ? this.semcService.atualizar(this.idEdicao, payload)
        : this.semcService.cadastrar(payload);

    requisicao$.subscribe({
      next: () => {
        this.enviando = false;
        this.router.navigate(['/catalogo']);
      },
      error: () => {
        this.enviando = false;
        this.erroApi = 'Erro ao salvar na Web API (verifique o json-server na porta 3000).';
      }
    });
  }

  limparCampos(): void {
    this.formItem.reset({
      tipo: 'Equipamento',
      codigo: 'EQP-060',
      status: 'Disponível',
      nome: '',
      categoria: 'Cutelaria & Fogo',
      pesoGramas: 300,
      dificuldadeOuCriticidade: 'Essencial (EDC)',
      localOuResponsavel: 'Marcelo Alexandrino de Souza Junior',
      descricao: '',
      checklistTexto: '',
      destaque: false
    });
    this.erroApi = '';
  }
}
