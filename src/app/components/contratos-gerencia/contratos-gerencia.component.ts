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
    this.tareaService.getTareas().subscribe((data:any)=>{
      this.listaTareas=data.tareas
    })

    this.contratosService.getContratos().subscribe((data:any)=>{
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
    this.contratosService.getContratos().subscribe((data:any)=>{
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
  }

  closeModalGerencia(){
    this.showModalGerencia=false;
  }

  closeModalContrato(){
    this.showModalContrato=false;
  }
}
