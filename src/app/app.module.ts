import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DetailAlbumPage } from '../pages/detail-album/detail-album';
import { RegistroUsuarioPage } from '../pages/registro-usuario/registro-usuario';
import { LoginUsuarioPage } from '../pages/login-usuario/login-usuario';
import { RockPage } from '../pages/rock/rock';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetailAlbumPage,
    RegistroUsuarioPage,
    LoginUsuarioPage,
    RockPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetailAlbumPage,
    RegistroUsuarioPage,
    LoginUsuarioPage,
    RockPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
