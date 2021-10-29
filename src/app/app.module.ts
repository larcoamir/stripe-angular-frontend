import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxStripeModule } from 'ngx-stripe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51INvQhAst71u30GLT6ALFMnv8Wnk5aHnQ6CruhDaHTy25gPVIG85i0fel0vtBKhDmrFVwTiNg5gjHaD6xvRhQWod00KGDI8cPU'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
