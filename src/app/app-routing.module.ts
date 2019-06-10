import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SliderPageComponent} from './slider-page/slider-page.component';

const routes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'slider-page', component: SliderPageComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
