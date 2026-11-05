import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CadastroItemComponent } from './pages/cadastro-item/cadastro-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SobreNosComponent,
    CatalogoComponent,
    CadastroItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }