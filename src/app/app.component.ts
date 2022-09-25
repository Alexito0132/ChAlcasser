import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  //currentUser: Jugador = null;
  titleEquipo$: Observable<string> = null;
  linkEquipo$: Observable<string> = null;
  titleEquipo = '';
  linkEquipo = '';
  appPages = [];

  constructor(
    private afs: AngularFirestore,
    private afsAuth: AngularFireAuth,
    private platform: Platform,
    private inAppBrowser: InAppBrowser,
    private appAvailability: AppAvailability,
    private router: Router,
    private translateService: TranslateService,
    private screenOrientation: ScreenOrientation
  ) {
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');
    if (!platform.is('desktop')) {
      screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
  }

  socialMedia(type) {
    switch (type) {
      case 'FACEBOOK': {
        this.openFacebook(
          'clubhandbolalcasser',
          'https://www.facebook.com/clubhandbolalcasser/'
        );
        break;
      }
      case 'INSTAGRAM': {
        this.openInstagram('chalcasser');
        break;
      }
      case 'TWITTER': {
        this.openTwitter('chalcasser');
        break;
      }
      case 'YOUTUBE': {
        this.openYoutube();
        break;
      }
    }
  }

  openFacebook(name, url) {
    let app;
    if (this.platform.is('ios')) {
      app = 'fb://';
    } else if (this.platform.is('android')) {
      app = 'com.facebook.katana';
    } else {
      this.openInApp('https://www.facebook.com/' + name);
      return;
    }

    this.appAvailability.check(app).then(
      (yes: boolean) => {
        const fbUrl = 'fb://facewebmodal/f?href=' + url;
        this.openInApp(fbUrl);
      },
      (no: boolean) => this.openInApp('https://www.facebook.com/' + name)
    );
  }

  openInApp(url) {
    this.inAppBrowser.create(url, '_system');
  }

  openInstagram(name) {
    let app;
    if (this.platform.is('ios')) {
      app = 'instagram://';
    } else if (this.platform.is('android')) {
      app = 'com.instagram.android';
    } else {
      this.openInApp('https://www.instagram.com/' + name);
      return;
    }

    this.appAvailability.check(app).then(
      (yes: boolean) => this.openInApp('instagram://user?username=' + name),
      (no: boolean) => this.openInApp('https://www.instagram.com/' + name)
    );
  }

  openTwitter(name) {
    let app;
    if (this.platform.is('ios')) {
      app = 'twitter://';
    } else if (this.platform.is('android')) {
      app = 'com.twitter.android';
    } else {
      this.openInApp('https://twitter.com/' + name);
      return;
    }

    this.appAvailability.check(app).then(
      (yes: boolean) => {
        const data = 'twitter://user?screen_name=' + name;
        this.openInApp(data);
      },
      (no: boolean) => this.openInApp('https://twitter.com/' + name)
    );
  }

  openYoutube() {
    let app;
    if (this.platform.is('ios')) {
      app = 'youtube://';
    } else if (this.platform.is('android')) {
      app = 'com.youtube.android';
    } else {
      this.openInApp('https://youtube.com/channel/UClTjVYGaC-9itiSxivCxhlQ');
      return;
    }

    this.appAvailability.check(app).then(
      (yes: boolean) => {
        const data = 'youtube://channel?id=UClTjVYGaC-9itiSxivCxhlQ';
        this.openInApp(data);
      },
      (no: boolean) =>
        this.openInApp('https://youtube.com/channel/UClTjVYGaC-9itiSxivCxhlQ')
    );
  }
}
