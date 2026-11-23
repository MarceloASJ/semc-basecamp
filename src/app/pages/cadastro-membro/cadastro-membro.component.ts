import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MembroSemc, ViaCepResponse } from '../../models/membro-semc.model';
import { MembroService } from '../../services/membro.service';

@Component({
  selector: 'app-cadastro-membro',
  templateUrl: './cadastro-membro.component.html',
  styleUrls: ['./cadastro-membro.component.css']
})
export class CadastroMembroComponent implements OnInit {
  formMembro!: FormGroup;
  membros: MembroSemc[] = [];
  mensagemSucesso = '';
  mensagemErro = '';
  buscandoCep = false;

  constructor(
    private fb: FormBuilder,
    private membroService: MembroService
  ) {}

  ngOnInit(): void {
    this.formMembro = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      logradouro: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      ddd: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      telefone: ['', [Validators.required, Validators.minLength(8)]],
      nivelExperiencia: ['Intermediário', [Validators.required]],
      perfil: ['Membro', [Validators.required]]
    });

    this.carregarMembros();
  }

  carregarMembros(): void {
    this.membroService.listarTodos().subscribe({
      next: (lista: MembroSemc[]) => (this.membros = lista),
      error: () => (this.mensagemErro = 'Não foi possível carregar membros da API.')
    });
  }

  consultarCep(): void {
    const cepCtrl = this.formMembro.get('cep');
    if (!cepCtrl || cepCtrl.invalid) {
      cepCtrl?.markAsTouched();
      this.mensagemErro = 'Informe um CEP válido com 8 dígitos para consultar o ViaCEP.';
      return;
    }

    this.buscandoCep = true;
    this.mensagemErro = '';

    this.membroService.buscarCep(cepCtrl.value).subscribe({
      next: (res: ViaCepResponse) => {
        this.buscandoCep = false;
        if (res.erro) {
          this.mensagemErro = 'CEP não encontrado na base do ViaCEP.';
          return;
        }
        this.formMembro.patchValue({
          logradouro: res.logradouro || '',
          bairro: res.bairro || '',
          cidade: res.localidade || '',
          uf: res.uf || '',
          ddd: res.ddd || ''
        });
        this.mensagemSucesso = `Endereço e DDD (${res.ddd}) carregados via ViaCEP!`;
      },
      error: () => {
        this.buscandoCep = false;
        this.mensagemErro = 'Erro ao consultar a API ViaCEP.';
      }
    });
  }

  campoInvalido(campo: string): boolean {
    const ctrl = this.formMembro.get(campo);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  salvarMembro(): void {
    if (this.formMembro.invalid) {
      this.formMembro.markAllAsTouched();
      return;
    }

    this.mensagemErro = '';
    this.mensagemSucesso = '';

    this.membroService.cadastrar(this.formMembro.value).subscribe({
      next: (novo: MembroSemc) => {
        this.mensagemSucesso = `Membro "${novo.nome}" cadastrado com sucesso!`;
        this.formMembro.reset({
          nivelExperiencia: 'Intermediário',
          perfil: 'Membro'
        });
        this.carregarMembros();
      },
      error: () => {
        this.mensagemErro = 'Erro ao salvar o membro na Web API (json-server).';
      }
    });
  }

  removerMembro(id: number, nome: string): void {
    this.membroService.excluir(id).subscribe({
      next: () => {
        this.mensagemSucesso = `Membro "${nome}" removido.`;
        this.carregarMembros();
      },
      error: () => {
        this.mensagemErro = 'Erro ao remover membro.';
      }
    });
  }
}
