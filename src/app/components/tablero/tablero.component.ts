import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { GerenciasService } from '../../services/gerencias.service';
import { TareasService } from '../../services/tareas.service';
import { EstadosSolicitudService } from '../../services/estados-solicitud.service';
import { EstadoResultadoService } from '../../services/estado-resultado.service';
import { PerfilesService } from '../../services/perfiles.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

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
  listaUsuariosBKO:any=[];
  listaUsuarios:any;

  listaPorHacer:any=[]
  listaEnProceso:any=[]
  listaEnTerminado:any=[]
  listaEnRevision:any=[]

  constructor(
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
    this.solicitudService.getSolicitudes().subscribe((data:any)=>{
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
      fecha_solicitud:fecha_solicitud.value,
      fecha_inicio:fecha_inicio.value,
      fecha_entrega:fecha_entrega.value

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

}
