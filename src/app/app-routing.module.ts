import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { HandValuesComponent } from './hand-values/hand-values.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/main-page',
    pathMatch: 'full'
  }, {

    path: 'main-page',
    component: MainPageComponent
  },
  {

    path: 'hand-values',
    component: HandValuesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
