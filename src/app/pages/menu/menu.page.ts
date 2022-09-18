import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NativePageTransitions
} from '@awesome-cordova-plugins/native-page-transitions/ngx';
import { AnimationController, NavController } from '@ionic/angular';

export interface Categoria {
  categoria: string;
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
      categoria: 'Partidos',
      foto: '../../../assets/images/categorias_image/final-cadet-44.png',
    },
    {
      categoria: 'Equipo',
      foto: '../../../assets/images/categorias_image/cartell-escola.png',
    },
    {
      categoria: 'Club',
      foto: '../../../assets/images/categorias_image/Sin_ttulo.png',
    },
    {
      categoria: 'Eventos',
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
    private animationCtrl: AnimationController,
    private nativePageTransitions: NativePageTransitions
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

  zoom(element: HTMLElement, route: string) {
    const zoomAnimation = this.animationCtrl
      .create('zoom-animation')
      .addElement(element)
      .keyframes([{ offset: 1, transform: 'scale:(.5) ' }])
      .duration(500)
      .onFinish(() => {
        this.navCtrl.navigateForward([route]);
        zoomAnimation.destroy();
      });

    zoomAnimation.play();
  }
}
