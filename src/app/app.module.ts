import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { VisitReportComponent } from './modules/components/visit-report/visit-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { EmpLoginComponent } from './modules/components/emp-login/emp-login.component';


@NgModule({
  declarations: [
    AppComponent,
    VisitReportComponent,
    EmpLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,  
    BrowserAnimationsModule,
    ZXingScannerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
