import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailAlbumPage } from './detail-album';

@NgModule({
  declarations: [
    DetailAlbumPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailAlbumPage),
  ],
})
export class DetailAlbumPageModule {}
