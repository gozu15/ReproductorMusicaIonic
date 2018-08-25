import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JazzPage } from './jazz';

@NgModule({
  declarations: [
    JazzPage,
  ],
  imports: [
    IonicPageModule.forChild(JazzPage),
  ],
})
export class JazzPageModule {}
