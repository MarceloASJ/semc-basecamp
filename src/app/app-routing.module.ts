import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CadastroItemComponent } from './pages/cadastro-item/cadastro-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sobre-nos', component: SobreNosComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'gerenciar', component: CadastroItemComponent },
  { path: 'gerenciar/:id', component: CadastroItemComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }