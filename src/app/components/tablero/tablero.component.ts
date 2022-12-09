import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { GerenciasService } from '../../services/gerencias.service';
import { TareasService } from '../../services/tareas.service';
import { EstadosSolicitudService } from '../../services/estados-solicitud.service';
import { EstadoResultadoService } from '../../services/estado-resultado.service';
import { PerfilesService } from '../../services/perfiles.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { ContratosService } from '../../services/contratos.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  listaSolicitudes:any;
  listaGerencias:any;
  listatareas:any;
  listaEstadoSolicitud:any;
  listaEstadoResultado:any;
  listaPerfiles:any;
  listaUsuariosGST:any=[];
  listaUsuariosALLGST:any=[];
  listaUsuariosBKO:any=[];
  listaContrato:any=[]
  listaUsuarios:any;

  listaPorHacer:any=[]
  listaEnProceso:any=[]
  listaEnTerminado:any=[]
  listaEnRevision:any=[]

  pagContratos:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');
  constructor(
    public contratosService:ContratosService,
    public solicitudService:SolicitudesService,
    public gerenciaService:GerenciasService,
    public tareasServicio:TareasService,
    public estadoSolicitudService:EstadosSolicitudService,
    public estadoResultadoService:EstadoResultadoService,
    public perfilesService:PerfilesService,
    public usuariosService:UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let dataFilterIngresadas:any
    if(this.usuario.perfil.sigla=="GST" || this.usuario.perfil.sigla=="BKO"){
      dataFilterIngresadas={
        ingresado:true,
        solicitante:this.usuario._id,
        page:1,
        options:0
      }
    }


    this.solicitudService.getSolicitudesFilter(dataFilterIngresadas).subscribe((data:any)=>{
      this.listaSolicitudes=data.solicitudes;
      this.listaEnProceso=data.solicitudes.filter((solicitud:any) => {
        return solicitud.estado_solicitud.nombre_estado=="En Proceso"
      })

      this.listaPorHacer=data.solicitudes.filter((solicitud:any) => {
        return solicitud.estado_solicitud.nombre_estado=="Por Hacer"
      })

      this.listaEnTerminado=data.solicitudes.filter((solicitud:any) => {
        return solicitud.estado_solicitud.nombre_estado=="Terminada"
      })

      this.listaEnRevision=data.solicitudes.filter((solicitud:any) => {
        return solicitud.estado_solicitud.nombre_estado=="En Revisión"
      })


      //console.log(this.listaPorHacer)
    })

    this.usuariosService.getUsuarios().subscribe((data:any)=>{
      this.listaUsuarios=data.usuarios;
      this.listaUsuariosALLGST=[]
      for (const usuario of data.usuarios) {
        if(usuario.perfil.sigla=="GST"){
          this.listaUsuariosGST.push(usuario)
        }

        if(usuario.perfil.sigla=="GST" || usuario.perfil.sigla=="GST-SUP" || usuario.perfil.sigla=="GST-ADM"){
          this.listaUsuariosALLGST.push(usuario)
        }

        if(usuario.perfil.sigla=="BKO"){
          this.listaUsuariosBKO.push(usuario)
        }
      }
    })

    this.gerenciaService.getGerencias(1,0).subscribe((data:any)=>{
      this.listaGerencias=data.gerencias;
    })

    this.tareasServicio.getTareas(1,"options=0").subscribe((data:any)=>{
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
    let contrato:any=document.querySelector("#contratoC")

    let dataFilter:any={
      contrato:contrato.value,
      gerencia:gerencia.value,
      tarea:tarea.value,
      perfil:perfil.value,
      estado_solicitud:estado_solicitud.value,
      estado_resultado:estado_resultado.value,
      fecha_solicitud:fecha_solicitud.value,
      fecha_inicio:fecha_inicio.value,
      fecha_entrega:fecha_entrega.value,
      options:0
    }

    if(this.usuario.perfil.sigla=="GST" || this.usuario.perfil.sigla=="BKO" || this.usuario.perfil.sigla=="ADC"){
      dataFilter.ingresado=true
      dataFilter.solicitante=this.usuario._id
      dataFilter.page=1
    }

    this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
      this.listaSolicitudes=data.solicitudes;
      this.listaEnProceso=data.solicitudes.filter((solicitud:any) => {
        return solicitud.estado_solicitud.nombre_estado=="En Proceso"
      })

      this.listaPorHacer=data.solicitudes.filter((solicitud:any) => {
        return solicitud.estado_solicitud.nombre_estado=="Por Hacer"
      })

      this.listaEnTerminado=data.solicitudes.filter((solicitud:any) => {
        return solicitud.estado_solicitud.nombre_estado=="Terminada"
      })

      this.listaEnRevision=data.solicitudes.filter((solicitud:any) => {
        return solicitud.estado_solicitud.nombre_estado=="En Revisión"
      })
    })
  }

  filterListReset(){
    let form:any=document.querySelector("#filterSearchTablero");
    form.reset();

    let dataFilter:any={
      options:0
    }

    if(this.usuario.perfil.sigla=="GST" || this.usuario.perfil.sigla=="BKO" || this.usuario.perfil.sigla=="ADC"){
      dataFilter.ingresado=true
      dataFilter.solicitante=this.usuario._id
      dataFilter.page=1
    }

    this.solicitudService.getSolicitudesFilter(dataFilter).subscribe((data:any)=>{
      this.listaSolicitudes=data.solicitudes;
      this.listaEnProceso=data.solicitudes.filter((solicitud:any) => {
        return solicitud.estado_solicitud.nombre_estado=="En Proceso"
      })

      this.listaPorHacer=data.solicitudes.filter((solicitud:any) => {
        return solicitud.estado_solicitud.nombre_estado=="Por Hacer"
      })

      this.listaEnTerminado=data.solicitudes.filter((solicitud:any) => {
        return solicitud.estado_solicitud.nombre_estado=="Terminada"
      })

      this.listaEnRevision=data.solicitudes.filter((solicitud:any) => {
        return solicitud.estado_solicitud.nombre_estado=="En Revisión"
      })
    })
  }

  goToSolicitud(solicitud:string){
    this.router.navigate(['solicitud/'+solicitud], { });
  }

  getTareasContrato({ target }:any) {
    let contratoI:any=document.querySelector("#contratoC")
    let contratoTxt=target.value;
    let idContrato:string=""
    for(let contrato of this.listaContrato){
      if((contrato.contrato+"-"+contrato.contradoid+"-"+contrato.adc.nombre)==contratoTxt.trim()){
        idContrato=contrato._id
      }
    } 

    contratoI.value=idContrato
  }


  filterContratosFromTC(){
    let contrato:any=document.querySelector("#NcontratoC")
    let dataFilter=`n_contrato=${contrato.value}`
    this.refreshListaContratos(1,dataFilter)
  }

  refreshListaContratos(pagina:any=1,extraParams:any=""){
    this.contratosService.getContratos(pagina,extraParams).subscribe((data:any)=>{
      this.pagContratos.hasNextPage=data.contratos.hasNextPage
      this.pagContratos.hasPrevPage=data.contratos.hasPrevPage
      this.pagContratos.totalPages=new Array(data.contratos.totalPages)
      this.pagContratos.page=data.contratos.page
      this.listaContrato=data.contratos.docs
    })
  }

}
