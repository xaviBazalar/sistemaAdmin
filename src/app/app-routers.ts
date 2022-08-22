import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { NuevaSolicitudComponent } from './components/nueva-solicitud/nueva-solicitud.component';
import { MisSolicitudesComponent } from './components/mis-solicitudes/mis-solicitudes.component';
import { ListaComponent } from './components/lista/lista.component';
import { VerSolicitudComponent } from './components/ver-solicitud/ver-solicitud.component';
import { VerSolicitudGstComponent } from './components/ver-solicitud-gst/ver-solicitud-gst.component';

const APP_ROUTES:Routes = [

  {path:'home',component: HomeComponent},
  {path:'tablero',component: TableroComponent},
  {path:'nuevaSolicitud',component: NuevaSolicitudComponent},
  {path:'misSolicitudes',component: MisSolicitudesComponent},
  {path:'lista',component: ListaComponent},
  {path:'solicitud/:id',component: VerSolicitudComponent},
  {path:'solicitudB/:id',component: VerSolicitudGstComponent},
  {path:'**',pathMatch:'full', redirectTo:'home'}
  // {path:'about',componet:HomeComponent},
 


];



export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{ useHash: true });
