import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolitudesUsuarioService } from '../../services/solitudes-usuario.service';
import { TareasService } from '../../services/tareas.service';
import { ContratosService } from '../../services/contratos.service';
import { TareasContratoService } from '../../services/tareas-contrato.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-tareas-contrato',
  templateUrl: './tareas-contrato.component.html',
  styleUrls: ['./tareas-contrato.component.css']
})
export class TareasContratoComponent implements OnInit {
  
  listaSolicitudes:any;
  listaSolicitudesPendiente:any;
  listaSolicitudesAsignadas:any;

  listaTareas:any=[];
  listaContrato:any=[];
  listaTareasContrato:any=[];

  listaUsuariosGST:any=[];
  listaUsuariosBKO:any=[];

  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');

  showModalContrato:boolean=false
  showModalTarea:boolean=false
  showModalTareaContrato:boolean=false
  showUpdate:boolean=false
  showUpdateTarea:boolean=false
  showUpdateContrato:boolean=false

  constructor(
    public solicitudService:SolicitudesService,
    public solicitudUsuarioService:SolitudesUsuarioService,
    public tareaService:TareasService,
    public contratosService:ContratosService,
    public tareasContratoService:TareasContratoService,
    public usuariosService:UsuariosService
    ) { 

    }

  ngOnInit(): void {

    this.usuariosService.getUsuarios().subscribe((data:any)=>{
      
      for (const usuario of data.usuarios) {
        if(usuario.perfil.sigla=="GST"){
          this.listaUsuariosGST.push(usuario)
        }

        if(usuario.perfil.sigla=="BKO"){
          this.listaUsuariosBKO.push(usuario)
        }
      }
    })

    this.tareaService.getTareas().subscribe((data:any)=>{
      this.listaTareas=data.tareas
    })

    this.contratosService.getContratos().subscribe((data:any)=>{
      this.listaContrato=data.contratos
    })

    this.tareasContratoService.getTareasContrato("").subscribe((data:any)=>{
      this.listaTareasContrato=data.contratos
    })
  }

  refreshListaTareas(){
    this.tareaService.getTareas().subscribe((data:any)=>{
      this.listaTareas=data.tareas
    })
  }

  refreshListaContratos(){
    this.contratosService.getContratos().subscribe((data:any)=>{
      this.listaContrato=data.contratos
    })
  }

  refreshListaTareasContrato(){
    this.tareasContratoService.getTareasContrato("").subscribe((data:any)=>{
      this.listaTareasContrato=data.contratos
    })
  }

  addTareaContrato(){
    let tarea:any=document.querySelector("#tareaC")
    let contrato:any=document.querySelector("#contratoC")
    let gst:any=document.querySelector("#usuarioGST")
    let bko:any=document.querySelector("#usuarioBKO")

    let dataContrato:any={
      tarea:tarea.value,
      contrato:contrato.value,
      gst:gst.value,
      bko:bko.value
    }

    this.tareasContratoService.addTareaContrato(dataContrato).subscribe((data:any)=>{
      this.closeModalTareaContrato()
      this.refreshListaTareasContrato()
    })
  }

  editTareaContrato(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdate=true

    let tarea:any=document.querySelector("#tareaC")
    let contrato:any=document.querySelector("#contratoC")
    let gst:any=document.querySelector("#usuarioGST")
    let bko:any=document.querySelector("#usuarioBKO")
    let estado:any=document.querySelector("#estadoTC")
    let id:any=document.querySelector("#id_tarea_contrato")
    tarea.value=data.tarea._id
    contrato.value=data.contrato._id
    gst.value=data.gst._id
    bko.value=data.bko._id
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    
    this.openModalTareaContrato()
  }

  editTarea(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateTarea=true

    let nombre_tarea:any=document.querySelector("#nombre_tarea")
    let frecuencia_tarea:any=document.querySelector("#frecuencia_tarea")
    let sla_tarea:any=document.querySelector("#sla_tarea")
    let estado:any=document.querySelector("#estadoT")
    let id:any=document.querySelector("#id_tarea")
    nombre_tarea.value=data.nombre_tarea
    frecuencia_tarea.value=data.frecuencia
    sla_tarea.value=data.SLA
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    
    this.openModalTarea()
  }

  editContrato(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateContrato=true

    let contrato:any=document.querySelector("#nombre_contrato")
    let contradoid:any=document.querySelector("#nro_contrato")
    let estado:any=document.querySelector("#estadoC")
    let id:any=document.querySelector("#id_contrato")
    contrato.value=data.contrato
    contradoid.value=data.contradoid
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    
    this.openModalContrato()
  }

  updateTareaContrato(){
    let tarea:any=document.querySelector("#tareaC")
    let contrato:any=document.querySelector("#contratoC")
    let gst:any=document.querySelector("#usuarioGST")
    let bko:any=document.querySelector("#usuarioBKO")
    let estado:any=document.querySelector("#estadoTC")
    let id:any=document.querySelector("#id_tarea_contrato")

    let dataContrato:any={
      id:id.value,
      tarea:tarea.value,
      contrato:contrato.value,
      gst:gst.value,
      bko:bko.value,
      estado:estado.value
    }

    this.tareasContratoService.updateTareaContrato(dataContrato).subscribe((data:any)=>{
      this.closeModalTareaContrato()
      this.refreshListaTareasContrato()
    })
  }

  addTarea(){
    let nombre_tarea:any=document.querySelector("#nombre_tarea")
    let frecuencia_tarea:any=document.querySelector("#frecuencia_tarea")
    let sla_tarea:any=document.querySelector("#sla_tarea")

    let dataTarea:any={
      nombre_tarea:nombre_tarea.value,
      frecuencia:frecuencia_tarea.value,
      SLA:sla_tarea.value
    }

    this.tareaService.addTarea(dataTarea).subscribe((data:any)=>{
      this.closeModalTarea()
      this.refreshListaTareas()
    })
  }

  updateTarea(){
    
    let id:any=document.querySelector("#id_tarea")
    let nombre_tarea:any=document.querySelector("#nombre_tarea")
    let frecuencia_tarea:any=document.querySelector("#frecuencia_tarea")
    let sla_tarea:any=document.querySelector("#sla_tarea")
    let estado:any=document.querySelector("#estadoT")

    let dataTarea:any={
      id:id.value,
      nombre_tarea:nombre_tarea.value,
      frecuencia:frecuencia_tarea.value,
      SLA:sla_tarea.value,
      estado:estado.value
    }

    this.tareaService.updateTarea(dataTarea).subscribe((data:any)=>{
      this.closeModalTarea()
      this.refreshListaTareas()
    })
  }

  addContrato(){
    let contrato:any=document.querySelector("#nombre_contrato")
    let contradoid:any=document.querySelector("#nro_contrato")

    let dataContrato:any={
      contradoid:contradoid.value,
      contrato:contrato.value,
    }

    this.contratosService.addContrato(dataContrato).subscribe((data:any)=>{
      this.closeModalContrato()
      this.refreshListaContratos()
    })
  }

  updateContrato(){
    
    let id:any=document.querySelector("#id_contrato")
    let contrato:any=document.querySelector("#nombre_contrato")
    let contradoid:any=document.querySelector("#nro_contrato")
    let estado:any=document.querySelector("#estadoC")

    let dataContrato:any={
      id:id.value,
      contradoid:contradoid.value,
      contrato:contrato.value,
      estado:estado.value
    }

    this.contratosService.updateContrato(dataContrato).subscribe((data:any)=>{
      this.closeModalContrato()
      this.refreshListaContratos()
    })
  }


  openModalTareaContrato(){
    this.showModalTareaContrato=true;
  }

  openModalTarea(){
    this.showModalTarea=true;
  }

  openModalContrato(){
    this.showModalContrato=true;
  }

  closeModalTareaContrato(){
    this.showModalTareaContrato=false;
    this.showUpdate=false;
    this.resetFormTareaContrato()
  }

  closeModalTarea(){
    this.showUpdateTarea=false
    this.showModalTarea=false;
    this.resetFormTarea()
  }

  closeModalContrato(){
    this.showUpdateContrato=false
    this.showModalContrato=false;
    this.resetFormContrato()
  }

  resetFormTareaContrato(){
    let tarea:any=document.querySelector("#tareaC")
    let contrato:any=document.querySelector("#contratoC")
    let gst:any=document.querySelector("#usuarioGST")
    let bko:any=document.querySelector("#usuarioBKO")
    let id:any=document.querySelector("#id_tarea_contrato")
    tarea.value=""
    contrato.value=""
    gst.value=""
    bko.value=""
    id.value=""

  }

  resetFormTarea(){
    let nombre_tarea:any=document.querySelector("#nombre_tarea")
    let frecuencia_tarea:any=document.querySelector("#frecuencia_tarea")
    let sla_tarea:any=document.querySelector("#sla_tarea")
    let id:any=document.querySelector("#id_tarea")
    nombre_tarea.value=""
    frecuencia_tarea.value=""
    sla_tarea.value=""
    id.value=""

  }

  resetFormContrato(){
    let contrato:any=document.querySelector("#nombre_contrato")
    let contradoid:any=document.querySelector("#nro_contrato")
    let id:any=document.querySelector("#id_contrato")
    contrato.value=""
    contradoid.value=""
    id.value=""
  }

}
