import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MembroSemc } from '../../models/membro-semc.model';
import { MembroService } from '../../services/membro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  erroLogin = '';
  carregando = false;

  constructor(
    private fb: FormBuilder,
    private membroService: MembroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['marcelo@semc.com.br', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  campoInvalido(campo: string): boolean {
    const ctrl = this.formLogin.get(campo);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  entrar(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.erroLogin = '';
    const { email, senha } = this.formLogin.value;

    this.membroService.autenticar(email, senha).subscribe({
      next: (membro: MembroSemc | null) => {
        this.carregando = false;
        if (membro) {
          this.router.navigate(['/dashboard']);
        } else {
          this.erroLogin = 'E-mail ou senha inválidos na base de dados.';
        }
      },
      error: () => {
        this.carregando = false;
        this.erroLogin = 'Erro ao comunicar com a API (json-server na porta 3000).';
      }
    });
  }
}
