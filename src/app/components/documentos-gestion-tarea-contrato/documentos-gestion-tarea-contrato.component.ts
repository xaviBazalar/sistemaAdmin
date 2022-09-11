import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { ContratosService } from '../../services/contratos.service';
import { DocumentosEntradaService } from '../../services/documentos-entrada.service';
import { DocumentosSalidaService } from '../../services/documentos-salida.service';
import { TareaDocumentosSalidaService } from '../../services/tarea-documentos-salida.service';
import { DocumentacionSolicitudedService } from '../../services/documentacion-solicituded.service';

@Component({
  selector: 'app-documentos-gestion-tarea-contrato',
  templateUrl: './documentos-gestion-tarea-contrato.component.html',
  styleUrls: ['./documentos-gestion-tarea-contrato.component.css']
})
export class DocumentosGestionTareaContratoComponent implements OnInit {
  listaDocumentosSalida:any=[];
  listaTareaDocumentosSalida:any=[];
  listaTareas:any=[];
  listaContrato:any=[];

  listaGestionCT:any=[]

  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');

  showModalDocumentoGestionTC:boolean=false
  constructor(public tareaService:TareasService,
    public contratosService:ContratosService,
    public documentosEntradaService:DocumentosEntradaService,
    public documentosSalidaService:DocumentosSalidaService,
    public tareaDocumentosSalidaService:TareaDocumentosSalidaService,
    public documentacionSolicitudedService:DocumentacionSolicitudedService) { }

  ngOnInit(): void {
    this.tareaService.getTareas().subscribe((data:any)=>{
      this.listaTareas=data.tareas
    })

    this.contratosService.getContratos().subscribe((data:any)=>{
      this.listaContrato=data.contratos
    })

    this.documentacionSolicitudedService.getDocumentacionSolicitud("","").subscribe((data:any)=>{
      this.listaGestionCT=data.documentacion_solicitudes
    })
  }

  refreshDocumentosGestion(){
    this.documentacionSolicitudedService.getDocumentacionSolicitud("","").subscribe((data:any)=>{
      this.listaGestionCT=data.documentacion_solicitudes
    })
  }

  addDocumentoGestionTC(){
    let tarea:any=document.querySelector("#tareaC")
    let nombre_documento:any=document.querySelector("#gestionC")
    let contrato:any=document.querySelector("#contratoC")

    let dataGestionTC:any={
      tarea:tarea.value,
      nombre_documento:nombre_documento.value,
      contrato:contrato.value,
      estado:"",
      observacion:""
    }

    this.documentacionSolicitudedService.addDocumentacionSolicitud(dataGestionTC).subscribe((data:any)=>{
      this.refreshDocumentosGestion()
      this.closeModalDocumentoGestionCT()
    })

  }


  openModalDocumentoGestionCT(){
    this.showModalDocumentoGestionTC=true;
  }

  closeModalDocumentoGestionCT(){
    this.showModalDocumentoGestionTC=false;
  }



}
