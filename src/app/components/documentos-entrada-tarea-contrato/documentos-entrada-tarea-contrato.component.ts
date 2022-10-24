import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolitudesUsuarioService } from '../../services/solitudes-usuario.service';
import { TareasService } from '../../services/tareas.service';
import { ContratosService } from '../../services/contratos.service';
import { TareasContratoService } from '../../services/tareas-contrato.service';
import { DocumentacionSolicitudedService } from '../../services/documentacion-solicituded.service';
import { DocumentosEntradaService } from '../../services/documentos-entrada.service';
import { TareaDocumentosEntradaService } from '../../services/tarea-documentos-entrada.service';

@Component({
  selector: 'app-documentos-entrada-tarea-contrato',
  templateUrl: './documentos-entrada-tarea-contrato.component.html',
  styleUrls: ['./documentos-entrada-tarea-contrato.component.css']
})
export class DocumentosEntradaTareaContratoComponent implements OnInit {
  
  listaDocumentosEntrada:any=[];
  listaTareaDocumentosEntrada:any=[];
  listaTareas:any=[];
  listaContrato:any=[];

  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');

  showModalDocumentoEntradaTC:boolean=false
  showModalDocumentoEntrada:boolean=false

  showUpdateDocumentoETC:boolean=false
  showUpdateDocumentoE:boolean=false

  constructor(
    public tareaService:TareasService,
    public contratosService:ContratosService,
    public documentosEntradaService:DocumentosEntradaService,
    public tareaDocumentosEntradaService:TareaDocumentosEntradaService) { }

  ngOnInit(): void {
    this.tareaService.getTareas(1,"").subscribe((data:any)=>{
      this.listaTareas=data.tareas.docs
    })

    this.contratosService.getContratos(1,"").subscribe((data:any)=>{
      this.listaContrato=data.contratos.docs
    })

    this.documentosEntradaService.getDocumentosEntrada().subscribe((data:any)=>{
      this.listaDocumentosEntrada= data.documentos_entrada
    })

    this.tareaDocumentosEntradaService.getTareaDocumentosEntrada("","").subscribe((data:any)=>{
      this.listaTareaDocumentosEntrada=data.tarea_documentos_entrada
    })
  }

  refreshDocumentosEntrada(){
    this.documentosEntradaService.getDocumentosEntrada().subscribe((data:any)=>{
      this.listaDocumentosEntrada= data.documentos_entrada
    })
  }

  refreshTareaDocumentosEntrada(){
    this.tareaDocumentosEntradaService.getTareaDocumentosEntrada("","").subscribe((data:any)=>{
      this.listaTareaDocumentosEntrada=data.tarea_documentos_entrada
    })
  }

  addDocumentoEntradaTC(){
    let tarea:any=document.querySelector("#tareaC")
    let documento_entrada:any=document.querySelector("#documentoEntradaC")
    let contrato:any=document.querySelector("#contratoC")

    let dataDocumentoTC:any={
      tarea:tarea.value,
      documento_entrada:documento_entrada.value,
      contrato:contrato.value
    }

    this.tareaDocumentosEntradaService.addTareaDocumentosEntrada(dataDocumentoTC).subscribe((data:any)=>{
      this.refreshTareaDocumentosEntrada()
      this.closeModalDocumentoEntradaCT()
    })

  }

  editDocumentoEntradaTC(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateDocumentoETC=true

    let tarea:any=document.querySelector("#tareaC")
    let documento_entrada:any=document.querySelector("#documentoEntradaC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoDETC")
    let id:any=document.querySelector("#id_documento_e_tc")
    tarea.value=data.tarea._id
    documento_entrada.value=data.documento_entrada._id
    contrato.value=data.contrato._id
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    this.openModalDocumentoEntradaCT()
  }

  updateDocumentoEntradaTC(){
    let tarea:any=document.querySelector("#tareaC")
    let documento_entrada:any=document.querySelector("#documentoEntradaC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoDETC")
    let id:any=document.querySelector("#id_documento_e_tc")

    let dataDocumentoTC:any={
      tarea:tarea.value,
      documento_entrada:documento_entrada.value,
      contrato:contrato.value,
      estado:estado.value,
      id:id.value
    }

    this.tareaDocumentosEntradaService.updateTareaDocumentosEntrada(dataDocumentoTC).subscribe((data:any)=>{
      this.refreshTareaDocumentosEntrada()
      this.closeModalDocumentoEntradaCT()
    })
  }

  addDocumentoEntrada(){
    let descripcion:any=document.querySelector("#nombre_documento")
    let tipo_documento:any=document.querySelector("#tipo_documento")

    let dataDocumentoEntrada:any={
      tipo_documento:tipo_documento.value,
      requerido:true,
      descripcion:descripcion.value,
    }

    this.documentosEntradaService.addDocumentoEntrada(dataDocumentoEntrada).subscribe((data:any)=>{
      this.refreshDocumentosEntrada()
      this.closeModalDocumentoEntrada()
    })

  }

  editDocumentoEntrada(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateDocumentoE=true
    let descripcion:any=document.querySelector("#nombre_documento")
    let tipo_documento:any=document.querySelector("#tipo_documento")
    let estado:any=document.querySelector("#estadoDE")
    let id:any=document.querySelector("#id_documento_e")
    descripcion.value=data.descripcion
    tipo_documento.value=data.tipo_documento
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    this.openModalDocumentoEntrada()
  }

  updateDocumentoEntrada(){
    let descripcion:any=document.querySelector("#nombre_documento")
    let tipo_documento:any=document.querySelector("#tipo_documento")
    let estado:any=document.querySelector("#estadoDE")
    let id:any=document.querySelector("#id_documento_e")

    let dataDocumentoEntrada:any={
      tipo_documento:tipo_documento.value,
      requerido:true,
      descripcion:descripcion.value,
      estado:estado.value,
      id:id.value
    }

    this.documentosEntradaService.updateDocumentoEntrada(dataDocumentoEntrada).subscribe((data:any)=>{
      this.refreshDocumentosEntrada()
      this.closeModalDocumentoEntrada()
    })
  }

  openModalDocumentoEntradaCT(){
    this.showModalDocumentoEntradaTC=true;
  }

  openModalDocumentoEntrada(){
    this.showModalDocumentoEntrada=true;
  }

  closeModalDocumentoEntradaCT(){
    this.showModalDocumentoEntradaTC=false;
    this.showUpdateDocumentoETC=false
    this.resetFormDETC()
  }

  closeModalDocumentoEntrada(){
    this.showModalDocumentoEntrada=false;
    this.showUpdateDocumentoE=false
    this.resetFormDE()
  }

  resetFormDETC(){
    let tarea:any=document.querySelector("#tareaC")
    let documento_entrada:any=document.querySelector("#documentoEntradaC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoDETC")
    let id:any=document.querySelector("#id_documento_e_tc")
    tarea.value=""
    documento_entrada.value=""
    contrato.value=""
    estado.value=""
    id.value=""
  }

  resetFormDE(){
    let descripcion:any=document.querySelector("#nombre_documento")
    let tipo_documento:any=document.querySelector("#tipo_documento")
    let estado:any=document.querySelector("#estadoDE")
    let id:any=document.querySelector("#id_documento_e")
    descripcion.value=""
    tipo_documento.value=""
    estado.value=""
    id.value=""
  }


}
