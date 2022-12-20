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

  pagGestionContratos:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');

  showModalDocumentoGestionTC:boolean=false
  showUpdateDS:boolean=false
  showModalDelete:boolean=false

  constructor(public tareaService:TareasService,
    public contratosService:ContratosService,
    public documentosEntradaService:DocumentosEntradaService,
    public documentosSalidaService:DocumentosSalidaService,
    public tareaDocumentosSalidaService:TareaDocumentosSalidaService,
    public documentacionSolicitudedService:DocumentacionSolicitudedService) { }

  ngOnInit(): void {
    this.tareaService.getTareas(1,"").subscribe((data:any)=>{
      this.listaTareas=data.tareas.docs
    })

    this.contratosService.getContratos(1,"").subscribe((data:any)=>{
      this.listaContrato=data.contratos.docs
    })

    this.documentacionSolicitudedService.getDocumentacionSolicitud("","",1,"").subscribe((data:any)=>{
      this.pagGestionContratos.hasNextPage=data.documentacion_solicitudes.hasNextPage
      this.pagGestionContratos.hasPrevPage=data.documentacion_solicitudes.hasPrevPage
      this.pagGestionContratos.totalPages=new Array(data.documentacion_solicitudes.totalPages)
      this.pagGestionContratos.page=data.documentacion_solicitudes.page
      this.listaGestionCT=data.documentacion_solicitudes.docs
    })
  }

  filterDGTareasContratos(){
    let contrato:any=document.querySelector("#searchContrato")
    let tarea:any=document.querySelector("#searchTarea")
    let gestion:any=document.querySelector("#searchGestion")
    let dataFilter="n_contrato="+contrato.value.replaceAll("&","amp;")+"&n_tarea="+tarea.value+"&n_gestion="+gestion.value
    this.documentacionSolicitudedService.getDocumentacionSolicitud("","",1,dataFilter).subscribe((data:any)=>{
      this.pagGestionContratos.hasNextPage=data.documentacion_solicitudes.hasNextPage
      this.pagGestionContratos.hasPrevPage=data.documentacion_solicitudes.hasPrevPage
      this.pagGestionContratos.totalPages=new Array(data.documentacion_solicitudes.totalPages)
      this.pagGestionContratos.page=data.documentacion_solicitudes.page
      this.listaGestionCT=data.documentacion_solicitudes.docs
    })
  }

  refreshDocumentosGestion(page:any=1,extraData:any=""){
    this.documentacionSolicitudedService.getDocumentacionSolicitud("","",page,extraData).subscribe((data:any)=>{
      this.pagGestionContratos.hasNextPage=data.documentacion_solicitudes.hasNextPage
      this.pagGestionContratos.hasPrevPage=data.documentacion_solicitudes.hasPrevPage
      this.pagGestionContratos.totalPages=new Array(data.documentacion_solicitudes.totalPages)
      this.pagGestionContratos.page=data.documentacion_solicitudes.page
      this.listaGestionCT=data.documentacion_solicitudes.docs
    })
  }

  refreshListaContratos(pagina:any=1,extraParams:any=""){
    this.contratosService.getContratos(pagina,extraParams).subscribe((data:any)=>{
      this.pagGestionContratos.hasNextPage=data.contratos.hasNextPage
      this.pagGestionContratos.hasPrevPage=data.contratos.hasPrevPage
      this.pagGestionContratos.totalPages=new Array(data.contratos.totalPages)
      this.pagGestionContratos.page=data.contratos.page
      this.listaContrato=data.contratos.docs
    })
  }

  filterContratosFromTC(){
    let contrato:any=document.querySelector("#NcontratoC")
    let dataFilter=`n_contrato=${contrato.value.replaceAll("&","amp;")}`
    this.refreshListaContratos(1,dataFilter)
  }

  getTareasContrato({ target }:any) {
    let contratoI:any=document.querySelector("#contratoC")
    let contratoTxt=target.value;
    let idContrato:string=""
    for(let contrato of this.listaContrato){
      if((contrato.contrato+"-"+contrato.contradoid)==contratoTxt.trim()){
        idContrato=contrato._id
      }
    } 

    contratoI.value=idContrato
  }

  addDocumentoGestionTC(){
    let tarea:any=document.querySelector("#tareaC")
    let nombre_documento:any=document.querySelector("#gestionC")
    let contrato:any=document.querySelector("#contratoC")


    let dataGestionTC:any={
      tarea:tarea.value,
      nombre_documento:nombre_documento.value,
      contrato:contrato.value,
      estado:1,
      observacion:""
    }

    this.documentacionSolicitudedService.addDocumentacionSolicitud(dataGestionTC).subscribe((data:any)=>{
      this.refreshDocumentosGestion()
      this.closeModalDocumentoGestionCT()
    })

  }

  editDocumentoGestionTC(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateDS=true
    let tarea:any=document.querySelector("#tareaC")
    let nombre_documento:any=document.querySelector("#gestionC")
    let contrato:any=document.querySelector("#NcontratoC")
    let contratoID:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoDS")
    let id:any=document.querySelector("#id_ds")
    tarea.value=data.tarea._id
    nombre_documento.value=data.nombre_documento
    contrato.value=data.contrato.contrato+"-"+data.contrato.contradoid//data.contrato._id
    contratoID.value=data.contrato._id
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    this.openModalDocumentoGestionCT()
  }

  updateDocumentoGestionTC(){
    let tarea:any=document.querySelector("#tareaC")
    let nombre_documento:any=document.querySelector("#gestionC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoDS")
    let id:any=document.querySelector("#id_ds")

    let dataGestionTC:any={
      id:id.value,
      tarea:tarea.value,
      nombre_documento:nombre_documento.value,
      contrato:contrato.value,
      estado:estado.value,
      observacion:""
    }

    this.documentacionSolicitudedService.updateDocumentacionSolicitud(dataGestionTC).subscribe((data:any)=>{
      this.refreshDocumentosGestion()
      this.closeModalDocumentoGestionCT()
    })

  }


  openModalDocumentoGestionCT(){
    this.showModalDocumentoGestionTC=true;
  }

  closeModalDocumentoGestionCT(){
    this.showModalDocumentoGestionTC=false;
    this.showUpdateDS=false;
    this.resetFormDS()
  }

  resetFormDS(){
    let tarea:any=document.querySelector("#tareaC")
    let nombre_documento:any=document.querySelector("#gestionC")
    let contrato:any=document.querySelector("#contratoC")
    let contratoID:any=document.querySelector("#NcontratoC")
    let estado:any=document.querySelector("#estadoDS")
    let id:any=document.querySelector("#id_ds")
    tarea.value=""
    nombre_documento.value=""
    contrato.value=""
    contratoID.value=""
    estado.value=1
    id.value=""
  }

  openModalDelete(tipo:string,id:string){
    let inputDelete:any=document.querySelector("#idDelete")
    let tipoDelete:any=document.querySelector("#tipoDelete")
    inputDelete.value=id
    tipoDelete.value=tipo

    this.showModalDelete=true
  }

  actionDeleteModal(){
    let tipoDelete:any=document.querySelector("#tipoDelete")
    let inputDelete:any=document.querySelector("#idDelete")
    if(tipoDelete.value=="documento-gestion-tarea"){
      this.deleteDocumentoGestionTarea(inputDelete.value)
    }

  }

  deleteDocumentoGestionTarea(id:string){
    let inputDelete:any=document.querySelector("#idDelete")
    inputDelete.value=""
    let params:any={
      id:id
    }

    this.documentacionSolicitudedService.deleteDocumentacionSolicitud(params).subscribe((data:any) => {
      this.refreshDocumentosGestion(1)
      this.closeModalDelete()
    });
    
  }

  closeModalDelete(){
    let inputDelete:any=document.querySelector("#idDelete")
    let tipoDelete:any=document.querySelector("#tipoDelete")
    inputDelete.value=""
    tipoDelete.value=""
    this.showModalDelete=false
  }


}
