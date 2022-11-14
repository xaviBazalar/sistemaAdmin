import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { SolitudesUsuarioService } from '../../services/solitudes-usuario.service';
import { TranslateService } from '@ngx-translate/core';

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
  mostrarMenu= false;
  itemMenu:any= [];

  menu_new_request:string=""
  menu_my_requests:string=""
  menu_request_board:string=""
  menu_request_status:string=""
  menu_workload:string=""
  menu_task_summary:string=""
  menu_system_administration:string=""

  menu_admin_task_contract:string=""
  menu_admin_entry_documentation:string=""
  menu_admin_output_documentation:string=""
  menu_admin_contract_management:string=""
  menu_admin_users:string=""
  menu_admin_contract_manager:string=""

  constructor(
    private translate: TranslateService,
    private router: Router,
    public solicitudesUsuarioService:SolitudesUsuarioService,
    public notificacionesUsuarioService:NotificacionesService,
  ) {
    this.usuario=localStorage.getItem("usuario");
 
  }

  async ngOnInit(): Promise<void> {
    
    this.menu_new_request= await this.translate.get('menu.new_request').toPromise()
    this.menu_my_requests= await this.translate.get('menu.my_requests').toPromise()
    this.menu_request_board=await this.translate.get('menu.request_board').toPromise()
    this.menu_request_status=await this.translate.get('menu.request_status').toPromise()
    this.menu_workload=await this.translate.get('menu.workload').toPromise()
    this.menu_task_summary=await this.translate.get('menu.task_summary').toPromise()
    this.menu_system_administration=await this.translate.get('menu.system_administration').toPromise()

    this.menu_admin_task_contract=await this.translate.get('menu.administration.task_contract').toPromise()
    this.menu_admin_entry_documentation=await this.translate.get('menu.administration.entry_documentation').toPromise()
    this.menu_admin_output_documentation=await this.translate.get('menu.administration.output_documentation').toPromise()
    this.menu_admin_contract_management=await this.translate.get('menu.administration.contract_management').toPromise()
    this.menu_admin_users=await this.translate.get('menu.administration.users').toPromise()
    this.menu_admin_contract_manager=await this.translate.get('menu.administration.contract_manager').toPromise()

    this.itemMenu=[
      {
        titulo:this.menu_new_request,
        url:"/nuevaSolicitud",
        submenu:[],
        icon:"icon-add.png"
      },
      {
        titulo:this.menu_my_requests,
        url:"/misSolicitudes",
        submenu:[],
        icon:"icon-list.png"
      },
      {
        titulo:this.menu_request_board,
        url:"/tableroEstadoSolicitudes",
        submenu:[],
        icon:"icon-dash.png"
      }
    ]

    let dataUser:any=localStorage.getItem("usuario")
    
    if(dataUser!==undefined &&  dataUser!=""){
      this.usuario=JSON.parse(dataUser)
      this.showHeader=true
    }
    let flag:any=0;
    this.router.events.subscribe((val:any) => {
      
      if (val instanceof NavigationEnd) {
        if(val.url=="/home"){
          this.showHeader=false;
        }else{
          flag=1
          this.showHeader=true
          this.showMenuAdmin()          
        }
      }
    });

    if(location.href!="http://localhost:4200/#/home" && flag==0){
      this.showMenuAdmin()
    }
    /*this.solicitudesUsuarioService.getSolicitudesUsuario(this.usuario._id).subscribe((data:any)=>{
      this.totalNotificaciones=data.total
    });*/

    this.notificacionesUsuarioService.getNotificacionesUsuario(this.usuario._id,false).subscribe((data:any)=>{
      this.totalNotificaciones=data.total
    });
    
  }

  showMenuAdmin(){
    let dataUser:any=localStorage.getItem("usuario")
          
          this.usuario=JSON.parse(dataUser)
          if(
            this.usuario._id=="630a34772b1569b707e2ebf8"
            ||
            this.usuario.perfil._id=="63719e786138680cfa534eba"
          ){
            this.itemMenu= [
              {
                titulo:this.menu_new_request,
                url:"/nuevaSolicitud",
                submenu:[],
                icon:"icon-add.png"
              },
              {
                titulo:this.menu_my_requests,
                url:"/misSolicitudes",
                submenu:[],
                icon:"icon-list.png"
              },
              {
                titulo:this.menu_request_status,
                url:"/tableroEstadoSolicitudes",
                submenu:[],
                icon:"icon-dash.png"
              },
              {
                titulo:this.menu_workload,
                url:"/dashboard/carga-de-trabajo",
                submenu:[],
                icon:"icon-dash.png"
              },{
                titulo:this.menu_task_summary,
                url:"/dashboard",
                submenu:[],
                icon:"icon-dash.png"
              },
              {
                titulo:this.menu_system_administration,
                url:"#",
                submenu:[
                  {
                    titulo:this.menu_admin_task_contract,
                    url:"/tareasContrato",
                    icon:"icon-conf.png"
                  },
                  {
                    titulo:this.menu_admin_entry_documentation,
                    url:"/documentosEntradaCT",
                    icon:"icon-conf.png"
                  },
                  {
                    titulo:this.menu_admin_output_documentation,
                    url:"/documentosSalidaCT",
                    icon:"icon-conf.png"
                  },
                  {
                    titulo:this.menu_admin_contract_management,
                    url:"/documentosGestionCT",
                    icon:"icon-conf.png"
                  },
                  {
                    titulo:this.menu_admin_users,
                    url:"/usuarios",
                    icon:"icon-conf.png"
                  },
                  {
                    titulo:this.menu_admin_contract_manager,
                    url:"/contratosGerencia",
                    icon:"icon-conf.png"
                  }
                ],
                icon:"icon-conf.png"
              }
            ]
          }

          if(this.usuario.perfil._id=="63719e786138680cfa534eba"){
            console.log(this.itemMenu[5].submenu)
            this.itemMenu[5].submenu.push({
                titulo:"Empresas",
                url:"/usuarios",
                icon:"icon-conf.png"
              }
            )

          }

          //63719e786138680cfa534eba

          //63719e786138680cfa534eba

          this.mostrarMenu=false;
          this.refreshNotificaciones()
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

  async ngAfterViewInit(): Promise<void> {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    

    
  }

}
