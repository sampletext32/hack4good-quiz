import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './components/main-page/main-page.component';
import {RouterModule, Routes} from "@angular/router";
import {GmapModule} from "../../shared/gmap/gmap.module";
import {AgmCoreModule} from "@agm/core";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  }
]

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GmapModule,
    AgmCoreModule,
  ]
})
export class MainPageModule {
}
