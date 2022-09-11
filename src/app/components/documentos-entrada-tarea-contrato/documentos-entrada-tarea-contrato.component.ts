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

  constructor(
    public tareaService:TareasService,
    public contratosService:ContratosService,
    public documentosEntradaService:DocumentosEntradaService,
    public tareaDocumentosEntradaService:TareaDocumentosEntradaService) { }

  ngOnInit(): void {
    this.tareaService.getTareas().subscribe((data:any)=>{
      this.listaTareas=data.tareas
    })

    this.contratosService.getContratos().subscribe((data:any)=>{
      this.listaContrato=data.contratos
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

  openModalDocumentoEntradaCT(){
    this.showModalDocumentoEntradaTC=true;
  }

  openModalDocumentoEntrada(){
    this.showModalDocumentoEntrada=true;
  }

  closeModalDocumentoEntradaCT(){
    this.showModalDocumentoEntradaTC=false;
  }

  closeModalDocumentoEntrada(){
    this.showModalDocumentoEntrada=false;
  }



}
