import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HandValuesComponent } from './hand-values/hand-values.component';
import { HandCalcComponent } from './hand-calc/hand-calc.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardPickerComponent } from './card-picker/card-picker.component';
import { TableEstimatorComponent } from './table-estimator/table-estimator.component';
import { HandComponent } from './hand/hand.component';

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
