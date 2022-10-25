import { Component, OnInit } from '@angular/core';
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
  listaUsuariosGST:any=[];
  listaUsuariosBKO:any=[];
  listaUsuarios:any;
  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');
  constructor(
    public solicitudService:SolicitudesService,
    public solicitudUsuarioService:SolitudesUsuarioService,
    public gerenciaService:GerenciasService,
    public tareasServicio:TareasService,
    public estadoSolicitudService:EstadosSolicitudService,
    public estadoResultadoService:EstadoResultadoService,
    public perfilesService:PerfilesService,
    public usuariosService:UsuariosService,
  ) { }
//getSolicitudes
  ngOnInit(): void {
    if(this.usuario.perfil.sigla=="ADC"){
      let dataFilterIngresadas:any={
        ingresado:true,
        solicitante:this.usuario._id
      }
      this.solicitudService.getSolicitudesFilter(dataFilterIngresadas).subscribe((data:any)=>{
        this.listaSolicitudes=data.solicitudes;
      })

      let dataFilter:any={
        ingresado:false,
        solicitante:this.usuario._id
      }
      this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
        this.listaSolicitudesPendiente=data.solicitudes;
      })

      

    }else{
      /*this.solicitudUsuarioService.getSolicitudesUsuario(this.usuario._id).subscribe((data:any)=>{
        this.listaSolicitudes=data.solicitudes;
      })*/

      let dataFilterIngresadas:any={
        ingresado:true,
        solicitante:this.usuario._id
      }
      this.solicitudService.getSolicitudesFilter(dataFilterIngresadas).subscribe((data:any)=>{
        this.listaSolicitudes=data.solicitudes;
      })

      let dataFilter:any={
        ingresado:false,
        solicitante:this.usuario._id
      }
      this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
        this.listaSolicitudesPendiente=data.solicitudes;
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
        this.listaSolicitudesAsignadas=data.solicitudes;

      })
    }
    

    this.usuariosService.getUsuarios().subscribe((data:any)=>{
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

    this.gerenciaService.getGerencias().subscribe((data:any)=>{
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
      fecha_entrega:fecha_entrega.value
    }

    this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
      this.listaSolicitudes=data.solicitudes;
    })

 
    dataFilter.ingresado=false
    dataFilter.solicitante=this.usuario._id

    this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
      this.listaSolicitudesPendiente=data.solicitudes;
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
      this.listaSolicitudesAsignadas=data.solicitudes;

    })
  }

  filterListReset(){
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
      fecha_entrega:fecha_entrega.value
    }

    this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
      this.listaSolicitudes=data.solicitudes;
    })

    let dataFilterPen:any={
      ingresado:false,
      solicitante:this.usuario._id
    }
    this.solicitudService.getSolicitudesFilter(dataFilterPen).subscribe((data:any)=>{
      this.listaSolicitudesPendiente=data.solicitudes;
    })


    let perfilUser=this.usuario.perfil.sigla
    let dataFilterAsignado:any;
    if(perfilUser=="GST"){
      dataFilterAsignado={
        ingresado:true,
        gst:this.usuario._id
      }
    }

    if(perfilUser=="BKO"){
      dataFilterAsignado={
        ingresado:true,
        bko:this.usuario._id
      }
    }
    this.solicitudService.getSolicitudesFilter(dataFilterAsignado).subscribe((data:any)=>{
      this.listaSolicitudesAsignadas=data.solicitudes;

    })
  }

}
