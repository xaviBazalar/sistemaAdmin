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

const APP_ROUTES:Routes = [

  {path:'home',component: HomeComponent},
  {path:'tareas',component: ListaComponent},
  {path:'notificaciones',component: NotificacionesComponent},
  {path:'nuevaSolicitud',component: NuevaSolicitudComponent},
  {path:'solicitudPendiente/:id',component: SolicitudPendienteComponent},
  {path:'misSolicitudes',component: MisSolicitudesComponent},
  {path:'tableroEstadoSolicitudes',component: TableroComponent},
  {path:'solicitud/:id',component: VerSolicitudComponent},
  {path:'solicitudB/:id',component: VerSolicitudGstComponent},
  {path:'**',pathMatch:'full', redirectTo:'home'}
  // {path:'about',componet:HomeComponent},
 


];



export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{ useHash: true });
