import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HandValuesComponent } from './pages/hand-values/hand-values.component';
import { HandCalcComponent } from './pages/hand-calc/hand-calc.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardPickerComponent } from './shared/card-picker/card-picker.component';
import { TableEstimatorComponent } from './pages/table-estimator/table-estimator.component';
import { HandComponent } from './shared/hand/hand.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HandValuesComponent,
    HandCalcComponent,
    CardPickerComponent,
    TableEstimatorComponent,
    HandComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
