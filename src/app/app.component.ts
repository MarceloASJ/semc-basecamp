import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembroSemc } from './models/membro-semc.model';
import { MembroService } from './services/membro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'semc-basecamp';
  membroLogado: MembroSemc | null = null;

  constructor(
    private membroService: MembroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.membroService.membroLogado$.subscribe(membro => {
      this.membroLogado = membro;
    });
  }

  sair(): void {
    this.membroService.logout();
    this.router.navigate(['/login']);
  }
}
