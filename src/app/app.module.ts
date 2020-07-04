import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { PopoutService } from './services/popout.service';
import { EmployerComponent } from './employer/employer.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PortalModule
  ],
  exports: [CustomerComponent, EmployerComponent],
  entryComponents: [CustomerComponent, EmployerComponent],
  declarations: [AppComponent, CustomerComponent, EmployerComponent],
  providers: [
    PopoutService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
