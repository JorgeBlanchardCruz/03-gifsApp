import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HomePageComponent } from './pages/home/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { ImageCardComponent } from './components/image-card/image-card.component';


@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent,
    ImageCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomePageComponent,
  ]
})
export class GifsModule { }
