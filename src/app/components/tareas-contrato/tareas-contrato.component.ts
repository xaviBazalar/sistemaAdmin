import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolitudesUsuarioService } from '../../services/solitudes-usuario.service';
import { TareasService } from '../../services/tareas.service';
import { ContratosService } from '../../services/contratos.service';
import { TareasContratoService } from '../../services/tareas-contrato.service';

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

  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');

  showModalContrato:boolean=false
  showModalTarea:boolean=false
  showModalTareaContrato:boolean=false
  constructor(
    public solicitudService:SolicitudesService,
    public solicitudUsuarioService:SolitudesUsuarioService,
    public tareaService:TareasService,
    public contratosService:ContratosService,
    public tareasContratoService:TareasContratoService
    ) { 

    }

  ngOnInit(): void {
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

    let dataContrato:any={
      tarea:tarea.value,
      contrato:contrato.value,
    }

    this.tareasContratoService.addTareaContrato(dataContrato).subscribe((data:any)=>{
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
  }

  closeModalTarea(){
    this.showModalTarea=false;
  }

  closeModalContrato(){
    this.showModalContrato=false;
  }

}
