import { BoxSelectComponente } from './box-select/box-select.componente';
//import { BoxSelect } from './box-select/box-select';
import { BrowserService } from './browser.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { APIService } from 'app/api.service';
import { CampoDireitaComponent } from './campo-direita/campo-direita.component';


@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    CampoDireitaComponent,
    BoxSelectComponente
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [APIService, BrowserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
