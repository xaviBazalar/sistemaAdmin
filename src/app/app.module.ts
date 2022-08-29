import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!

//  Rutas//

import {APP_ROUTING} from './app-routers'

// import { AppRoutingModule } from './app-routers';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { NuevaSolicitudComponent } from './components/nueva-solicitud/nueva-solicitud.component';
import { MisSolicitudesComponent } from './components/mis-solicitudes/mis-solicitudes.component';
import { ListaComponent } from './components/lista/lista.component';
import { VerSolicitudComponent } from './components/ver-solicitud/ver-solicitud.component';
import { HeaderComponent } from './components/header/header.component';
import { VerSolicitudGstComponent } from './components/ver-solicitud-gst/ver-solicitud-gst.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableroComponent,
    NuevaSolicitudComponent,
    MisSolicitudesComponent,
    ListaComponent,
    VerSolicitudComponent,
    HeaderComponent,
    VerSolicitudGstComponent,
    NotificacionesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
