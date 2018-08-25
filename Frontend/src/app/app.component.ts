import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Icon } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DetailAlbumPage } from '../pages/detail-album/detail-album';
import { RegistroUsuarioPage } from '../pages/registro-usuario/registro-usuario';
import { LoginUsuarioPage } from '../pages/login-usuario/login-usuario';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any,iconos:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage, iconos:'md-home' },
      { title: 'Popular Albums', component: ListPage,iconos:'md-disc' },
      { title: 'Top 50', component:DetailAlbumPage,iconos:'musical-notes'}
    
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  openPageRegistro(){
    this.nav.setRoot(RegistroUsuarioPage);
  }
  openPageLogin(){
    this.nav.setRoot(LoginUsuarioPage);
  }
}
