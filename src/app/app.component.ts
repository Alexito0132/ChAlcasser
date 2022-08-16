import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translateService: TranslateService) {

    // Idioma
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');
  }
}
