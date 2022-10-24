import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolitudesUsuarioService } from '../../services/solitudes-usuario.service';
import { TareasService } from '../../services/tareas.service';
import { ContratosService } from '../../services/contratos.service';
import { TareasContratoService } from '../../services/tareas-contrato.service';
import { ContratosGerenciaService } from '../../services/contratos-gerencia.service';
import { GerenciasService } from '../../services/gerencias.service';

@Component({
  selector: 'app-contratos-gerencia',
  templateUrl: './contratos-gerencia.component.html',
  styleUrls: ['./contratos-gerencia.component.css']
})
export class ContratosGerenciaComponent implements OnInit {
  listaSolicitudes:any;
  listaSolicitudesPendiente:any;
  listaSolicitudesAsignadas:any;

  listaTareas:any=[];
  listaContrato:any=[];
  listaTareasContrato:any=[];
  listaContratosGerencia:any=[];
  listaGerencias:any=[];

  showUpdateCG:boolean=false
  showUpdateG:boolean=false
  showUpdateC:boolean=false

  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');

  showModalContrato:boolean=false
  showModalGerencia:boolean=false
  showModalContratoGerencia:boolean=false
  constructor(
    public solicitudService:SolicitudesService,
    public solicitudUsuarioService:SolitudesUsuarioService,
    public tareaService:TareasService,
    public contratosService:ContratosService,
    public tareasContratoService:TareasContratoService,
    public contratosGerenciaService:ContratosGerenciaService,
    public gerenciasService:GerenciasService
    ) { }

  ngOnInit(): void {
    this.tareaService.getTareas(1,"").subscribe((data:any)=>{
      this.listaTareas=data.tareas
    })

    this.contratosService.getContratos(1,"").subscribe((data:any)=>{
      this.listaContrato=data.contratos
    })

    this.contratosGerenciaService.getContratosGerencia("").subscribe((data:any)=>{
      this.listaContratosGerencia=data.contratos_gerencia
    })

    this.gerenciasService.getGerencias().subscribe((data:any)=>{
      this.listaGerencias=data.gerencias
    })
  }

  refreshListaGerencia(){
    this.gerenciasService.getGerencias().subscribe((data:any)=>{
      this.listaGerencias=data.gerencias
    })
  }

  refreshListaContratos(){
    this.contratosService.getContratos(1,"").subscribe((data:any)=>{
      this.listaContrato=data.contratos
    })
  }

  refreshListaContratosGerencia(){
    this.contratosGerenciaService.getContratosGerencia("").subscribe((data:any)=>{
      this.listaContratosGerencia=data.contratos_gerencia
    })
  }

  addContratoGerencia(){
    let gerencia:any=document.querySelector("#gerenciaC")
    let contrato:any=document.querySelector("#contratoC")

    let dataContratoG:any={
      gerencia:gerencia.value,
      contrato:contrato.value,
    }

    this.contratosGerenciaService.addContratoGerencia(dataContratoG).subscribe((data:any)=>{
      this.closeModalContratoGerencia()
      this.refreshListaContratosGerencia()
    })
  }

  editContratoGerencia(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateCG=true

    let gerencia:any=document.querySelector("#gerenciaC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoCG")
    let id:any=document.querySelector("#id_cg")
    gerencia.value=data.gerencia._id
    contrato.value=data.contrato._id
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    this.openModalContratoGerencia()
  }

  updateContratoGerencia(){
    let gerencia:any=document.querySelector("#gerenciaC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoCG")
    let id:any=document.querySelector("#id_cg")

    let dataContratoG:any={
      gerencia:gerencia.value,
      contrato:contrato.value,
      estado:estado.value,
      id:id.value
    }

    this.contratosGerenciaService.updateContratoGerencia(dataContratoG).subscribe((data:any)=>{
      this.closeModalContratoGerencia()
      this.refreshListaContratosGerencia()
    })
  }
  

  addGerencia(){
    let nombre_gerencia:any=document.querySelector("#nombre_gerencia")

    let dataGerencia:any={
      nombre_gerencia:nombre_gerencia.value,
    }

    this.gerenciasService.addGerencia(dataGerencia).subscribe((data:any)=>{
      this.closeModalGerencia()
      this.refreshListaGerencia()
    })
  }

  editGerencia(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateG=true

    let nombre_gerencia:any=document.querySelector("#nombre_gerencia")
    let estado:any=document.querySelector("#estadoG")
    let id:any=document.querySelector("#id_g")
    nombre_gerencia.value=data.nombre_gerencia
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    this.openModalGerencia()
  }
  
  updateGerencia(){
    let nombre_gerencia:any=document.querySelector("#nombre_gerencia")
    let estado:any=document.querySelector("#estadoG")
    let id:any=document.querySelector("#id_g")

    let dataUpdate:any={
      nombre_gerencia:nombre_gerencia.value,
      estado:estado.value,
      id:id.value
    }

    this.gerenciasService.updateGerencia(dataUpdate).subscribe((data:any)=>{
      this.closeModalGerencia()
      this.refreshListaGerencia()
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

  editContrato(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateC=true

    let contrato:any=document.querySelector("#nombre_contrato")
    let contradoid:any=document.querySelector("#nro_contrato")
    let estado:any=document.querySelector("#estadoC")
    let id:any=document.querySelector("#id_c")
    contrato.value=data.contrato,
    contradoid.value=data.contradoid
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    this.openModalContrato()
  }

  updateContrato(){
    let contrato:any=document.querySelector("#nombre_contrato")
    let contradoid:any=document.querySelector("#nro_contrato")
    let estado:any=document.querySelector("#estadoC")
    let id:any=document.querySelector("#id_c")

    let dataUpdate:any={
      contrato:contrato.value,
      contradoid:contradoid.value,
      estado:estado.value,
      id:id.value
    }

    this.contratosService.updateContrato(dataUpdate).subscribe((data:any)=>{
      this.closeModalContrato()
      this.refreshListaContratos()
    })
  }

  openModalContratoGerencia(){
    this.showModalContratoGerencia=true;
  }

  openModalGerencia(){
    this.showModalGerencia=true;
  }

  openModalContrato(){
    this.showModalContrato=true;
  }

  closeModalContratoGerencia(){
    this.showModalContratoGerencia=false;
    this.showUpdateCG=false;
    this.resetFormCG()
  }

  closeModalGerencia(){
    this.showModalGerencia=false;
    this.showUpdateG=false
    this.resetFormG()
  }

  closeModalContrato(){
    this.showModalContrato=false;
    this.showUpdateC=false
    this.resetFormC()
  }

  resetFormCG(){
    let gerencia:any=document.querySelector("#gerenciaC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoCG")
    let id:any=document.querySelector("#id_cg")

    gerencia.value=""
    contrato.value=""
    estado.value=""
    id.value=""
  }

  resetFormG(){
    let nombre_gerencia:any=document.querySelector("#nombre_gerencia")
    let estado:any=document.querySelector("#estadoCG")
    let id:any=document.querySelector("#id_cg")

    nombre_gerencia.value=""
    estado.value=""
    id.value=""
  }

  resetFormC(){
    let contrato:any=document.querySelector("#nombre_contrato")
    let contradoid:any=document.querySelector("#nro_contrato")
    let estado:any=document.querySelector("#estadoCG")
    let id:any=document.querySelector("#id_cg")

    contrato.value=""
    contradoid.value=""
    estado.value=""
    id.value=""
  }
}
