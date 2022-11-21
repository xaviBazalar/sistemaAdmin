import { Component, OnInit, ViewChild } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { ContratosService } from '../../services/contratos.service';
import { DocumentosEntradaService } from '../../services/documentos-entrada.service';
import { TareaDocumentosEntradaService } from '../../services/tarea-documentos-entrada.service';
import { PaginadorComponent } from '../paginador/paginador.component';

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

  pagTareDocumentosEntrada:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  pagDocumentosEntrada:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  pagContratos:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }
  

  @ViewChild("pagTDE") paginator:any;
  @ViewChild("pagDE") paginatorDE:any;

  constructor(
    public tareaService:TareasService,
    public contratosService:ContratosService,
    public documentosEntradaService:DocumentosEntradaService,
    public tareaDocumentosEntradaService:TareaDocumentosEntradaService) { 
 
    }

  async ngOnInit(): Promise<void> {
    this.tareaService.getTareas(1,"").subscribe((data:any)=>{
      this.listaTareas=data.tareas.docs
    })

    this.contratosService.getContratos(1,"").subscribe((data:any)=>{
      this.listaContrato=data.contratos.docs
    })

    this.documentosEntradaService.getDocumentosEntrada(1,1).subscribe((data:any)=>{
      this.pagDocumentosEntrada.hasNextPage=data.documentos_entrada.hasNextPage
      this.pagDocumentosEntrada.hasPrevPage=data.documentos_entrada.hasPrevPage
      this.pagDocumentosEntrada.totalPages=new Array(data.documentos_entrada.totalPages)
      this.pagDocumentosEntrada.page=data.documentos_entrada.page
      this.listaDocumentosEntrada= data.documentos_entrada.docs
      this.paginatorDE.pagParams=this.pagDocumentosEntrada
      
    })

    let resultsTDE:any = await this.tareaDocumentosEntradaService.getTareaDocumentosEntrada("","",1,1).toPromise();
    this.pagTareDocumentosEntrada.hasNextPage=resultsTDE.tarea_documentos_entrada.hasNextPage
    this.pagTareDocumentosEntrada.hasPrevPage=resultsTDE.tarea_documentos_entrada.hasPrevPage
    this.pagTareDocumentosEntrada.totalPages=new Array(resultsTDE.tarea_documentos_entrada.totalPages)
    this.pagTareDocumentosEntrada.page=resultsTDE.tarea_documentos_entrada.page
    this.listaTareaDocumentosEntrada=resultsTDE.tarea_documentos_entrada.docs
    this.paginator.pagParams=this.pagTareDocumentosEntrada
  }

  filterDETareasContratos(){
    let contrato:any=document.querySelector("#searchContrato")
    let tarea:any=document.querySelector("#searchTarea")

    let dataFilter="n_contrato="+contrato.value.replaceAll("&","amp;")+"&n_tarea="+tarea.value
    

    this.tareaDocumentosEntradaService.getTareaDocumentosEntradaFilter("","",dataFilter).subscribe((data:any)=>{
      this.pagTareDocumentosEntrada.hasNextPage=data.tarea_documentos_entrada.hasNextPage
      this.pagTareDocumentosEntrada.hasPrevPage=data.tarea_documentos_entrada.hasPrevPage
      this.pagTareDocumentosEntrada.totalPages=new Array(data.tarea_documentos_entrada.totalPages)
      this.pagTareDocumentosEntrada.page=data.tarea_documentos_entrada.page
      this.listaTareaDocumentosEntrada=data.tarea_documentos_entrada.docs
    })
    /*this.tareasContratoService.getTareasContratoFilter(dataFilter).subscribe((data:any)=>{
      this.listaTareasContrato=data.contratos.docs
    })*/
  }

  filterDE(){
    let documento_entrada:any=document.querySelector("#searchDocumentoEntrada")
    let dataFilter="n_documento_entrada="+documento_entrada.value
    

    this.documentosEntradaService.getDocumentosEntradaFilter(1,1,dataFilter).subscribe((data:any)=>{
      this.pagDocumentosEntrada.hasNextPage=data.documentos_entrada.hasNextPage
      this.pagDocumentosEntrada.hasPrevPage=data.documentos_entrada.hasPrevPage
      this.pagDocumentosEntrada.totalPages=new Array(data.documentos_entrada.totalPages)
      this.pagDocumentosEntrada.page=data.documentos_entrada.page
      this.listaDocumentosEntrada= data.documentos_entrada.docs
    })
  }

  refreshLista(info:any,tipo:string){
    if(tipo=="TareaDEntrada"){
      this.refreshTareaDocumentosEntrada(info)
    }else if(tipo=="DEntrada"){
      this.refreshDocumentosEntrada(info);
    }
  }

  refreshDocumentosEntrada(page:string|number){
    this.documentosEntradaService.getDocumentosEntrada(page,1).subscribe((data:any)=>{
      this.pagDocumentosEntrada.hasNextPage=data.documentos_entrada.hasNextPage
      this.pagDocumentosEntrada.hasPrevPage=data.documentos_entrada.hasPrevPage
      this.pagDocumentosEntrada.totalPages=new Array(data.documentos_entrada.totalPages)
      this.pagDocumentosEntrada.page=data.documentos_entrada.page
      this.listaDocumentosEntrada= data.documentos_entrada.docs
    })
  }

  refreshTareaDocumentosEntrada(page:string|number){
    this.tareaDocumentosEntradaService.getTareaDocumentosEntrada("","",page,1).subscribe((data:any)=>{
      this.pagTareDocumentosEntrada.hasNextPage=data.tarea_documentos_entrada.hasNextPage
      this.pagTareDocumentosEntrada.hasPrevPage=data.tarea_documentos_entrada.hasPrevPage
      this.pagTareDocumentosEntrada.totalPages=new Array(data.tarea_documentos_entrada.totalPages)
      this.pagTareDocumentosEntrada.page=data.tarea_documentos_entrada.page
      this.listaTareaDocumentosEntrada=data.tarea_documentos_entrada.docs
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
      this.refreshTareaDocumentosEntrada(1)
      this.closeModalDocumentoEntradaCT()
    })

  }

  editDocumentoEntradaTC(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateDocumentoETC=true

    let tarea:any=document.querySelector("#tareaC")
    let documento_entrada:any=document.querySelector("#documentoEntradaC")
    let contrato:any=document.querySelector("#NcontratoC")
    let contratoID:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoDETC")
    let id:any=document.querySelector("#id_documento_e_tc")
    tarea.value=data.tarea._id
    documento_entrada.value=data.documento_entrada._id
    contrato.value=data.contrato.contrato+"-"+data.contrato.contradoid//data.contrato._id
    contratoID.value=data.contrato._id
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
      this.refreshTareaDocumentosEntrada(1)
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
      this.refreshDocumentosEntrada(1)
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
      this.refreshDocumentosEntrada(1)
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
    let contratoID:any=document.querySelector("#NcontratoC")
    let estado:any=document.querySelector("#estadoDETC")
    let id:any=document.querySelector("#id_documento_e_tc")
    tarea.value=""
    documento_entrada.value=""
    contrato.value=""
    contratoID.value=""
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

  getTareasContrato({ target }:any) {
    let contratoI:any=document.querySelector("#contratoC")
    let contratoTxt=target.value;
    let idContrato:string=""
    for(let contrato of this.listaContrato){    
      let contratTemp=contrato.contrato.replaceAll("  "," ").trim()+"-"+contrato.contradoid
      if(contratTemp.trim()==contratoTxt.trim()){
        idContrato=contrato._id
      }
    } 

    contratoI.value=idContrato
  }

  filterContratosFromTC(){
    let contrato:any=document.querySelector("#NcontratoC")
    let dataFilter=`n_contrato=${contrato.value.replaceAll("&","amp;")}`
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
