import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolitudesUsuarioService } from '../../services/solitudes-usuario.service';
import { GerenciasService } from '../../services/gerencias.service';
import { TareasService } from '../../services/tareas.service';
import { EstadosSolicitudService } from '../../services/estados-solicitud.service';
import { EstadoResultadoService } from '../../services/estado-resultado.service';
import { PerfilesService } from '../../services/perfiles.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css']
})



export class MisSolicitudesComponent implements OnInit {

  listaSolicitudes:any;
  listaSolicitudesPendiente:any;
  listaSolicitudesAsignadas:any;

  listaGerencias:any;
  listatareas:any;
  listaEstadoSolicitud:any;
  listaEstadoResultado:any;
  listaPerfiles:any;
  listaUsuariosGST:any=[{
    perfil:{
      sigla:""
    }
  }];
  listaUsuariosBKO:any=[];
  listaUsuarios:any;
  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');

  pagSolicitudes:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  pagSolicitudesA:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  pagSolicitudesG:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  diasPorVencer:string|number=0

  @ViewChild("pagSolicitudesA",{static:false}) paginadorSolicitudesA:any;
  @ViewChild("pagSolicitudes",{static:false}) paginadorSolicitudes:any;
  @ViewChild("pagSolicitudesG",{static:false}) paginadorSolicitudesG:any;

  constructor(
    public solicitudService:SolicitudesService,
    public solicitudUsuarioService:SolitudesUsuarioService,
    public gerenciaService:GerenciasService,
    public tareasServicio:TareasService,
    public estadoSolicitudService:EstadosSolicitudService,
    public estadoResultadoService:EstadoResultadoService,
    public perfilesService:PerfilesService,
    public usuariosService:UsuariosService,
  ) { 
    let hoy:any = new Date();
   
    let mes:any=((hoy.getMonth())+1);
    mes=(mes.toString().length==1)?"0"+mes:mes;
    let dia:any=hoy.getDate();
    dia=(dia.toString().length==1)?"0"+dia:dia;

    let hoyWithFormat:string=hoy.getFullYear()+"-"+mes+"-"+dia
    let i:number=0;
    while (i<1) { // 1 días habiles
      hoy.setTime(hoy.getTime()+24*60*60*1000); // añadimos 1 día
      if (hoy.getDay() != 6 && hoy.getDay() != 0)
          i++;  
    }

    mes=(((hoy.getMonth())+1).toString().length==1)?"0"+((hoy.getMonth())+1):((hoy.getMonth())+1);
    dia=(hoy.getDate().toString().length==1)?"0"+hoy.getDate():hoy.getDate();
    
    let fechaVenc:any = hoy.getFullYear()+"-"+mes+"-"+dia
    let dataFilterIngresadas:any={
      ingresado:true,
      solicitante:this.usuario._id,
      page:1,
      options:0,
      por_vencer:1,
      fec_hoy:hoyWithFormat,
      fec_ven:fechaVenc
    }

    this.solicitudService.getSolicitudesFilter(dataFilterIngresadas).subscribe((data:any)=>{
      this.diasPorVencer=data.total;
      //this.listaSolicitudes=data.solicitudes;
    })
  }
//getSolicitudes
  ngOnInit(): void {
    if(this.usuario.perfil.sigla=="ADC"){
      let dataFilterIngresadas:any={
        ingresado:true,
        solicitante:this.usuario._id,
        page:1,
        options:1
      }
      this.solicitudService.getSolicitudesFilter(dataFilterIngresadas).subscribe((data:any)=>{
        this.pagSolicitudes.hasNextPage=data.solicitudes.hasNextPage
        this.pagSolicitudes.hasPrevPage=data.solicitudes.hasPrevPage
        this.pagSolicitudes.totalPages=new Array(data.solicitudes.totalPages)
        this.pagSolicitudes.page=data.solicitudes.page
        this.listaSolicitudes=data.solicitudes.docs;
        this.paginadorSolicitudes.pagParams=this.pagSolicitudes
      })

      let dataFilter:any={
        ingresado:false,
        solicitante:this.usuario._id,
        page:1,
        options:1
      }
      this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
        this.pagSolicitudesG.hasNextPage=data.solicitudes.hasNextPage
        this.pagSolicitudesG.hasPrevPage=data.solicitudes.hasPrevPage
        this.pagSolicitudesG.totalPages=new Array(data.solicitudes.totalPages)
        this.pagSolicitudesG.page=data.solicitudes.page
        this.listaSolicitudesPendiente=data.solicitudes.docs;
        this.paginadorSolicitudesG.pagParams=this.pagSolicitudesG
      })

      

    }else{
      /*this.solicitudUsuarioService.getSolicitudesUsuario(this.usuario._id).subscribe((data:any)=>{
        this.listaSolicitudes=data.solicitudes;
      })*/

      let dataFilterIngresadas:any={
        ingresado:true,
        solicitante:this.usuario._id,
        page:1,
        options:1
      }
      this.solicitudService.getSolicitudesFilter(dataFilterIngresadas).subscribe((data:any)=>{
        this.pagSolicitudes.hasNextPage=data.solicitudes.hasNextPage
        this.pagSolicitudes.hasPrevPage=data.solicitudes.hasPrevPage
        this.pagSolicitudes.totalPages=new Array(data.solicitudes.totalPages)
        this.pagSolicitudes.page=data.solicitudes.page
        this.listaSolicitudes=data.solicitudes.docs;
        this.paginadorSolicitudes.pagParams=this.pagSolicitudes
      })

      let dataFilter:any={
        ingresado:false,
        solicitante:this.usuario._id,
        page:1,
        options:1
      }
      this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
        this.pagSolicitudesG.hasNextPage=data.solicitudes.hasNextPage
        this.pagSolicitudesG.hasPrevPage=data.solicitudes.hasPrevPage
        this.pagSolicitudesG.totalPages=new Array(data.solicitudes.totalPages)
        this.pagSolicitudesG.page=data.solicitudes.page
        this.listaSolicitudesPendiente=data.solicitudes.docs;
        this.paginadorSolicitudesG.pagParams=this.pagSolicitudesG
      })

 
      let perfil=this.usuario.perfil.sigla
      let dataFilterAsignado:any;
      if(perfil=="GST"){
        dataFilterAsignado={
          ingresado:true,
          gst:this.usuario._id
        }
      }

      if(perfil=="BKO"){
        dataFilterAsignado={
          ingresado:true,
          bko:this.usuario._id
        }
      }
      this.solicitudService.getSolicitudesFilter(dataFilterAsignado).subscribe((data:any)=>{
        this.paginadorSolicitudesA.hasNextPage=data.solicitudes.hasNextPage
        this.paginadorSolicitudesA.hasPrevPage=data.solicitudes.hasPrevPage
        this.paginadorSolicitudesA.totalPages=new Array(data.solicitudes.totalPages)
        this.paginadorSolicitudesA.page=data.solicitudes.page
        this.listaSolicitudesAsignadas=data.solicitudes.docs;
        this.paginadorSolicitudesA.pagParams=this.paginadorSolicitudesA
      })
    }
    

    this.usuariosService.getUsuarios(1,0).subscribe((data:any)=>{
      this.listaUsuarios=data.usuarios;
      for (const usuario of data.usuarios) {
        if(usuario.perfil.sigla=="GST"){
          this.listaUsuariosGST.push(usuario)
        }

        if(usuario.perfil.sigla=="BKO"){
          this.listaUsuariosBKO.push(usuario)
        }
      }
    })

    this.gerenciaService.getGerencias(1,0).subscribe((data:any)=>{
      this.listaGerencias=data.gerencias;
    })

    this.tareasServicio.getTareas(1,"").subscribe((data:any)=>{
      this.listatareas=data.tareas;
    })

    this.estadoSolicitudService.getSolicitudes().subscribe((data:any)=>{
      this.listaEstadoSolicitud=data.estadoSolicitudes;
    })

    this.estadoResultadoService.getSolicitudes().subscribe((data:any)=>{
      this.listaEstadoResultado=data.estadoResultados;
    })

    this.perfilesService.getPerfiles().subscribe((data:any)=>{
      this.listaPerfiles=data.perfiles;
    })
    
  }

  refreshLista(info:any,tipo:string){
    if(tipo=="Solicitudes"){
      this.filterListReset(info)
    }else if(tipo=="SolicitudesA"){
      this.refreshListSA(info)
    }
  }

  filterList(){
    let gerencia:any=document.querySelector("#gerencia")
    let tarea:any=document.querySelector("#tarea")
    let perfil:any=document.querySelector("#perfil")
    let estado_solicitud:any=document.querySelector("#estado_solicitud")
    let estado_resultado:any=document.querySelector("#estado_resultado")
    let fecha_solicitud:any=document.querySelector("#fecha_solicitud")
    let fecha_inicio:any=document.querySelector("#fecha_inicio")
    let fecha_entrega:any=document.querySelector("#fecha_entrega")

    let dataFilter:any={
      gerencia:gerencia.value,
      tarea:tarea.value,
      perfil:perfil.value,
      estado_solicitud:estado_solicitud.value,
      estado_resultado:estado_resultado.value,
      solicitante:this.usuario._id,
      fecha_solicitud:fecha_solicitud.value,
      fecha_inicio:fecha_inicio.value,
      fecha_entrega:fecha_entrega.value,
      page:1,
      options:1
    }

    this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
      this.paginadorSolicitudes.hasNextPage=data.solicitudes.hasNextPage
      this.paginadorSolicitudes.hasPrevPage=data.solicitudes.hasPrevPage
      this.paginadorSolicitudes.totalPages=new Array(data.solicitudes.totalPages)
      this.paginadorSolicitudes.page=data.solicitudes.page
      this.listaSolicitudes=data.solicitudes.docs;
      this.paginadorSolicitudes.pagParams=this.paginadorSolicitudes
    })

 
    dataFilter.ingresado=false
    dataFilter.solicitante=this.usuario._id

    this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
      this.paginadorSolicitudesG.hasNextPage=data.solicitudes.hasNextPage
      this.paginadorSolicitudesG.hasPrevPage=data.solicitudes.hasPrevPage
      this.paginadorSolicitudesG.totalPages=new Array(data.solicitudes.totalPages)
      this.paginadorSolicitudesG.page=data.solicitudes.page
      this.listaSolicitudesPendiente=data.solicitudes.docs;
      this.paginadorSolicitudesG.pagParams=this.paginadorSolicitudesG
    })


    let perfilUser=this.usuario.perfil.sigla
    let dataFilterAsignado:any;
    if(perfilUser=="GST"){
      dataFilter.solicitante=""
      dataFilter.ingresado=true
      dataFilter.gst=this.usuario._id
    }

    if(perfilUser=="BKO"){
      dataFilter.solicitante=""
      dataFilter.ingresado=true
      dataFilter.bko=this.usuario._id
    }

    
    this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
      this.paginadorSolicitudesA.hasNextPage=data.solicitudes.hasNextPage
      this.paginadorSolicitudesA.hasPrevPage=data.solicitudes.hasPrevPage
      this.paginadorSolicitudesA.totalPages=new Array(data.solicitudes.totalPages)
      this.paginadorSolicitudesA.page=data.solicitudes.page
      this.listaSolicitudesAsignadas=data.solicitudes.docs;
      this.paginadorSolicitudesA.pagParams=this.paginadorSolicitudesA

    })
  }

  filterListReset(page:string|number){
    let form:any=document.querySelector("#filterSearchSolicitudes");
    form.reset();
    
    let gerencia:any=document.querySelector("#gerencia")
    let tarea:any=document.querySelector("#tarea")
    let perfil:any=document.querySelector("#perfil")
    let estado_solicitud:any=document.querySelector("#estado_solicitud")
    let estado_resultado:any=document.querySelector("#estado_resultado")
    let fecha_solicitud:any=document.querySelector("#fecha_solicitud")
    let fecha_inicio:any=document.querySelector("#fecha_inicio")
    let fecha_entrega:any=document.querySelector("#fecha_entrega")

    let dataFilter:any={
      gerencia:gerencia.value,
      tarea:tarea.value,
      perfil:perfil.value,
      estado_solicitud:estado_solicitud.value,
      estado_resultado:estado_resultado.value,
      solicitante:this.usuario._id,
      fecha_solicitud:fecha_solicitud.value,
      fecha_inicio:fecha_inicio.value,
      fecha_entrega:fecha_entrega.value,
      page:page,
      options:1
    }

    this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
      this.pagSolicitudes.hasNextPage=data.solicitudes.hasNextPage
      this.pagSolicitudes.hasPrevPage=data.solicitudes.hasPrevPage
      this.pagSolicitudes.totalPages=new Array(data.solicitudes.totalPages)
      this.pagSolicitudes.page=data.solicitudes.page
      this.listaSolicitudes=data.solicitudes.docs;
      this.paginadorSolicitudes.pagParams=this.pagSolicitudes
    })

    let dataFilterPen:any={
      ingresado:false,
      solicitante:this.usuario._id,
      page:page,
      options:1
    }

    this.solicitudService.getSolicitudesFilter(dataFilterPen).subscribe((data:any)=>{
      this.pagSolicitudesG.hasNextPage=data.solicitudes.hasNextPage
      this.pagSolicitudesG.hasPrevPage=data.solicitudes.hasPrevPage
      this.pagSolicitudesG.totalPages=new Array(data.solicitudes.totalPages)
      this.pagSolicitudesG.page=data.solicitudes.page
      this.listaSolicitudesPendiente=data.solicitudes.docs;
      this.paginadorSolicitudesG.pagParams=this.pagSolicitudesG
    })


    let perfilUser=this.usuario.perfil.sigla
    let dataFilterAsignado:any;
    if(perfilUser=="GST"){
      dataFilterAsignado={
        ingresado:true,
        gst:this.usuario._id,
        page:page,
        options:1
      }
    }

    if(perfilUser=="BKO"){
      dataFilterAsignado={
        ingresado:true,
        bko:this.usuario._id,
        page:page,
        options:1
      }
    }
    this.solicitudService.getSolicitudesFilter(dataFilterAsignado).subscribe((data:any)=>{
      this.pagSolicitudesA.hasNextPage=data.solicitudes.hasNextPage
      this.pagSolicitudesA.hasPrevPage=data.solicitudes.hasPrevPage
      this.pagSolicitudesA.totalPages=new Array(data.solicitudes.totalPages)
      this.pagSolicitudesA.page=data.solicitudes.page
      this.listaSolicitudesAsignadas=data.solicitudes.docs;
      this.paginadorSolicitudesA.pagParams=this.pagSolicitudesA
    })
  }

  refreshListSA(page:string|number){
    let perfilUser=this.usuario.perfil.sigla
    let dataFilterAsignado:any;
    if(perfilUser=="GST"){
      dataFilterAsignado={
        ingresado:true,
        gst:this.usuario._id,
        page:page,
        options:1
      }
    }

    if(perfilUser=="BKO"){
      dataFilterAsignado={
        ingresado:true,
        bko:this.usuario._id,
        page:page,
        options:1
      }
    }
    this.solicitudService.getSolicitudesFilter(dataFilterAsignado).subscribe((data:any)=>{
      this.pagSolicitudesA.hasNextPage=data.solicitudes.hasNextPage
      this.pagSolicitudesA.hasPrevPage=data.solicitudes.hasPrevPage
      this.pagSolicitudesA.totalPages=new Array(data.solicitudes.totalPages)
      this.pagSolicitudesA.page=data.solicitudes.page
      this.listaSolicitudesAsignadas=data.solicitudes.docs;
      this.paginadorSolicitudesA.pagParams=this.pagSolicitudesA
    })
  }

}
