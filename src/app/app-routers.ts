import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableroComponent } from './components/tablero/tablero.component';

const APP_ROUTES:Routes = [

  {path:'home',component: HomeComponent},
  {path:'tablero',component: TableroComponent},
  {path:'**',pathMatch:'full', redirectTo:'home'}
  // {path:'about',componet:HomeComponent},
 


];



export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
