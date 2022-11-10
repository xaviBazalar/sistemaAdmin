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
      titulo:"Nueva Solicitud",
      url:"/nuevaSolicitud",
      submenu:[],
      icon:"icon-add.png"
    },
    {
      titulo:"Mis Solictudes",
      url:"/misSolicitudes",
      submenu:[],
      icon:"icon-list.png"
    },
    {
      titulo:"Tablero Solicitudes",
      url:"/tableroEstadoSolicitudes",
      submenu:[],
      icon:"icon-dash.png"
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
                titulo:"Nueva Solicitud",
                url:"/nuevaSolicitud",
                submenu:[],
                icon:"icon-add.png"
              },
              {
                titulo:"Mis Solictudes",
                url:"/misSolicitudes",
                submenu:[],
                icon:"icon-list.png"
              },
              {
                titulo:"Estado de Solicitudes",
                url:"/tableroEstadoSolicitudes",
                submenu:[],
                icon:"icon-dash.png"
              },
              {
                titulo:"Carga de Trabajo",
                url:"/dashboard/carga-de-trabajo",
                submenu:[],
                icon:"icon-dash.png"
              },{
                titulo:"Resumen de Tareas",
                url:"/dashboard",
                submenu:[],
                icon:"icon-dash.png"
              },
              {
                titulo:"Administración Sistema",
                url:"#",
                submenu:[
                  {
                    titulo:"Admin Tarea Contrato",
                    url:"/tareasContrato",
                    icon:"icon-conf.png"
                  },
                  {
                    titulo:"Admin Doc Entrada",
                    url:"/documentosEntradaCT",
                    icon:"icon-conf.png"
                  },
                  {
                    titulo:"Admin Doc Salida",
                    url:"/documentosSalidaCT",
                    icon:"icon-conf.png"
                  },
                  {
                    titulo:"Admin Gestion Contrato",
                    url:"/documentosGestionCT",
                    icon:"icon-conf.png"
                  },
                  {
                    titulo:"Admin Usuario",
                    url:"/usuarios",
                    icon:"icon-conf.png"
                  },
                  {
                    titulo:"Admin Contratos Gerencia",
                    url:"/contratosGerencia",
                    icon:"icon-conf.png"
                  },
                ],
                icon:"icon-conf.png"
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
      this.router.navigate(['/home', { }]);
    },500)
  }

  goTo(url:string){
    if(url!="#"){
      this.router.navigate([url.replace("/","")], { });
    }
    
  }

}
