import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import {MaterialModule} from './shared/modules/material.module'
import {InterceptorModule} from './shared/modules/auth-intercetor.module'
import {AppRoutingModule}from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ModalComponent} from './shared/components/modal/modal.component'

import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { IconModule } from '@visurel/iconify-angular';


@NgModule({
  declarations:[
    AppComponent,
    LoginComponent,
    HomeComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    MaterialModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    IconModule,
    InterceptorModule,

  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
