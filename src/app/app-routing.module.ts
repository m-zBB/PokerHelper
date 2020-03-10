import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HandValuesComponent } from './pages/hand-values/hand-values.component';
import { HandCalcComponent } from './pages/hand-calc/hand-calc.component';
import { TableEstimatorComponent } from './pages/table-estimator/table-estimator.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/main-page',
        pathMatch: 'full'
    },
    {
        path: 'main-page',
        component: MainPageComponent
    },
    {
        path: 'hand-values',
        component: HandValuesComponent
    },
    {
        path: 'hand-calc',
        component: HandCalcComponent
    },
    {
        path: 'table-estimator',
        component: TableEstimatorComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
