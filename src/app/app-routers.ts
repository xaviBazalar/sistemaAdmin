import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { NuevaSolicitudComponent } from './components/nueva-solicitud/nueva-solicitud.component';
import { MisSolicitudesComponent } from './components/mis-solicitudes/mis-solicitudes.component';
import { ListaComponent } from './components/lista/lista.component';
import { VerSolicitudComponent } from './components/ver-solicitud/ver-solicitud.component';
import { VerSolicitudGstComponent } from './components/ver-solicitud-gst/ver-solicitud-gst.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { SolicitudPendienteComponent } from './components/solicitud-pendiente/solicitud-pendiente.component';
import { TareasContratoComponent } from './components/tareas-contrato/tareas-contrato.component';
import { DocumentosEntradaTareaContratoComponent } from './components/documentos-entrada-tarea-contrato/documentos-entrada-tarea-contrato.component';
import { DocumentosSalidaTareaContratoComponent } from './components/documentos-salida-tarea-contrato/documentos-salida-tarea-contrato.component';
import { DocumentosGestionTareaContratoComponent } from './components/documentos-gestion-tarea-contrato/documentos-gestion-tarea-contrato.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ContratosGerenciaComponent } from './components/contratos-gerencia/contratos-gerencia.component';
import { DashboardCargaDeTrabajoComponent } from './components/dashboard-carga-de-trabajo/dashboard-carga-de-trabajo.component';
import { DashboardGeneralComponent } from './components/dashboard-general/dashboard-general.component';
import { RecoveryUsuarioComponent } from './components/recovery-usuario/recovery-usuario.component';

const APP_ROUTES:Routes = [

  {path:'home',component: HomeComponent},
  {path:'tareas',component: ListaComponent},
  {path:'usuarios',component: UsuariosComponent},
  {path:'notificaciones',component: NotificacionesComponent},
  {path:'nuevaSolicitud',component: NuevaSolicitudComponent},
  {path:'solicitudPendiente/:id',component: SolicitudPendienteComponent},
  {path:'misSolicitudes',component: MisSolicitudesComponent},
  {path:'tareasContrato',component: TareasContratoComponent},
  {path:'contratosGerencia',component: ContratosGerenciaComponent},
  {path:'documentosEntradaCT',component: DocumentosEntradaTareaContratoComponent},
  {path:'documentosSalidaCT',component: DocumentosSalidaTareaContratoComponent},
  {path:'documentosGestionCT',component: DocumentosGestionTareaContratoComponent},
  {path:'tableroEstadoSolicitudes',component: TableroComponent},
  {path:'solicitud/:id',component: VerSolicitudComponent},
  {path:'solicitudB/:id',component: VerSolicitudGstComponent},
  {path:'dashboard/carga-de-trabajo',component: DashboardCargaDeTrabajoComponent},
  {path:'dashboard',component: DashboardGeneralComponent},
  {path:'recoveryUsuario/:id',component:RecoveryUsuarioComponent},
  {path:'**',pathMatch:'full', redirectTo:'home'}
  
  // {path:'about',componet:HomeComponent},
 


];



export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{ useHash: true });
