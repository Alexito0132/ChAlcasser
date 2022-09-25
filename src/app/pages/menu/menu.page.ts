import { Component, OnInit, ViewChild } from '@angular/core';
import { NativePageTransitions } from '@awesome-cordova-plugins/native-page-transitions/ngx';
import { AnimationController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export interface Categoria {
  categoria: Observable<any>;
  foto: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  status = false;
  categorias: Categoria[] = [
    {
      categoria: this.translateService.get('main.categorias.partidos'),
      foto: '../../../assets/images/categorias_image/final-cadet-44.png',
    },
    {
      categoria: this.translateService.get('main.categorias.equipos'),
      foto: '../../../assets/images/categorias_image/cartell-escola.png',
    },
    {
      categoria: this.translateService.get('main.categorias.club'),
      foto: '../../../assets/images/categorias_image/Sin_ttulo.png',
    },
    {
      categoria: this.translateService.get('main.categorias.eventos'),
      foto: '../../../assets/images/categorias_image/Sin_ttulo_.png',
    },
  ];

  mouseDown = false;
  startX: any;
  scrollLeft: any;
  date = new Date();
  slider = document.querySelector<HTMLElement>('.parent');

  constructor(
    private navCtrl: NavController,
    private translateService: TranslateService
  ) {}

  ngOnInit() {}

  startDragging(e, flag, el) {
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }
  stopDragging(e, flag) {
    this.mouseDown = false;
  }
  moveEvent(e, el) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }

  navigate(route: string) {
    this.navCtrl.navigateForward([route]);
  }
}
