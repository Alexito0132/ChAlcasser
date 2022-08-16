import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { TranslateModule } from '@ngx-translate/core';
import { EventosComponent } from './components/eventos/eventos.component';
import { PartidosComponent } from './components/partidos/partidos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    TranslateModule,
  ],
  declarations: [MenuPage, CategoriasComponent, EventosComponent, PartidosComponent],
})
export class MenuPageModule {}
