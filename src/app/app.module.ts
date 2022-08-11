import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//  Rutas//

import {APP_ROUTING} from './app-routers'

// import { AppRoutingModule } from './app-routers';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TableroComponent } from './components/tablero/tablero.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableroComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
