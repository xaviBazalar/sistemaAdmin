import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { SolitudesUsuarioService } from '../../services/solitudes-usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showHeader=false;
  usuario:any;
  totalNotificaciones:number=0
  showSubmenu:boolean=false
  constructor(
    private router: Router,
    public solicitudesUsuarioService:SolitudesUsuarioService,
    public notificacionesUsuarioService:NotificacionesService,
  ) {
    this.usuario=localStorage.getItem("usuario");
   }

   mostrarMenu= false;

   itemMenu:any= [
    {
      titulo:"NuevaSolicitud",
      url:"/nuevaSolicitud",
      submenu:[]
    },
    {
      titulo:"MisSolictudes",
      url:"/misSolicitudes",
      submenu:[]
    },
    {
      titulo:"Tablero Estado Solicitudes",
      url:"/tableroEstadoSolicitudes",
      submenu:[]
    }
    /*{
      titulo:"Tablero",
      url:"/tablero"
    }*/
  ];

  ngOnInit(): void {
    let dataUser:any=localStorage.getItem("usuario")
    
    if(dataUser!==undefined &&  dataUser!=""){
      this.usuario=JSON.parse(dataUser)
      this.showHeader=false
    }

    this.router.events.subscribe((val:any) => {
      if (val instanceof NavigationEnd) {
        if(val.url=="/home"){
          this.showHeader=false;
        }else{
          let dataUser:any=localStorage.getItem("usuario")
          
          this.usuario=JSON.parse(dataUser)
          if(this.usuario._id=="630a34772b1569b707e2ebf8"){
            this.itemMenu= [
              {
                titulo:"NuevaSolicitud",
                url:"/nuevaSolicitud",
                submenu:[]
              },
              {
                titulo:"MisSolictudes",
                url:"/misSolicitudes",
                submenu:[]
              },
              {
                titulo:"Tablero Estado Solicitudes",
                url:"/tableroEstadoSolicitudes",
                submenu:[]
              },
              {
                titulo:"Administración Sistema",
                url:"#",
                submenu:[
                  {
                    titulo:"Admin Tarea Contrato",
                    url:"/tareasContrato"
                  },
                  {
                    titulo:"Admin Doc Entrada",
                    url:"/documentosEntradaCT"
                  },
                  {
                    titulo:"Admin Doc Salida",
                    url:"/documentosSalidaCT"
                  },
                  {
                    titulo:"Admin Gestion Contrato",
                    url:"/documentosGestionCT"
                  },
                  {
                    titulo:"Admin Usuario",
                    url:"/usuarios"
                  },
                  {
                    titulo:"Admin Contratos Gerencia",
                    url:"/contratosGerencia"
                  },
                ]
              }
            ]
          }
          this.showHeader=true;
          this.mostrarMenu=false;
          this.refreshNotificaciones()
        }
      }
      
    });

    /*this.solicitudesUsuarioService.getSolicitudesUsuario(this.usuario._id).subscribe((data:any)=>{
      this.totalNotificaciones=data.total
    });*/

    this.notificacionesUsuarioService.getNotificacionesUsuario(this.usuario._id,false).subscribe((data:any)=>{
      this.totalNotificaciones=data.total
    });
    
  }

  refreshNotificaciones(){
    this.notificacionesUsuarioService.getNotificacionesUsuario(this.usuario._id,false).subscribe((data:any)=>{
      this.totalNotificaciones=data.total
    });
  }

  logout(){
    localStorage.setItem("usuario","")
    setTimeout(()=>{
      this.router.navigate(['home'], { });
    },500)
  }

}
