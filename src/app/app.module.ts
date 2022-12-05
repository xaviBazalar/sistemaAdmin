import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
import { SolicitudPendienteComponent } from './components/solicitud-pendiente/solicitud-pendiente.component';
import { TareasContratoComponent } from './components/tareas-contrato/tareas-contrato.component';
import { DocumentosEntradaTareaContratoComponent } from './components/documentos-entrada-tarea-contrato/documentos-entrada-tarea-contrato.component';
import { DocumentosSalidaTareaContratoComponent } from './components/documentos-salida-tarea-contrato/documentos-salida-tarea-contrato.component';
import { DocumentosGestionTareaContratoComponent } from './components/documentos-gestion-tarea-contrato/documentos-gestion-tarea-contrato.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ContratosGerenciaComponent } from './components/contratos-gerencia/contratos-gerencia.component';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { DashboardCargaDeTrabajoComponent } from './components/dashboard-carga-de-trabajo/dashboard-carga-de-trabajo.component';
import { DashboardGeneralComponent } from './components/dashboard-general/dashboard-general.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RecoveryUsuarioComponent } from './components/recovery-usuario/recovery-usuario.component';
import { AvisosExtraComponent } from './components/avisos-extra/avisos-extra.component';
import { AutorizarSolicitudComponent } from './components/autorizar-solicitud/autorizar-solicitud.component';
import { NgxPrintModule } from 'ngx-print';

export function HttpLoaderFactory(http:HttpClient){
  //return new TranslateHttpLoader(http)
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');

}

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
    NotificacionesComponent,
    SolicitudPendienteComponent,
    TareasContratoComponent,
    DocumentosEntradaTareaContratoComponent,
    DocumentosSalidaTareaContratoComponent,
    DocumentosGestionTareaContratoComponent,
    UsuariosComponent,
    ContratosGerenciaComponent,
    PaginadorComponent,
    DashboardCargaDeTrabajoComponent,
    DashboardGeneralComponent,
    RecoveryUsuarioComponent,
    AvisosExtraComponent,
    AutorizarSolicitudComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    TranslateModule.forRoot(
      {
        loader:{
          provide:TranslateLoader,
          useFactory:HttpLoaderFactory,
          deps:[HttpClient]
        }
      }
    ),
    NgxPrintModule
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
