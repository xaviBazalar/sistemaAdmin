import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { DocumentosEntradaService } from '../../services/documentos-entrada.service';
import { ContratosService } from '../../services/contratos.service';
import { TareaDocumentosEntradaService } from '../../services/tarea-documentos-entrada.service';
import { TareaDocumentosSalidaService } from '../../services/tarea-documentos-salida.service';
import { DocumentosSalidaService } from '../../services/documentos-salida.service';

@Component({
  selector: 'app-documentos-salida-tarea-contrato',
  templateUrl: './documentos-salida-tarea-contrato.component.html',
  styleUrls: ['./documentos-salida-tarea-contrato.component.css']
})
export class DocumentosSalidaTareaContratoComponent implements OnInit {
  listaDocumentosSalida:any=[];
  listaTareaDocumentosSalida:any=[];
  listaTareas:any=[];
  listaContrato:any=[];

  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');

  showModalDocumentoSalidaTC:boolean=false
  showModalDocumentoSalida:boolean=false

  showUpdateDocumentoSTC:boolean=false
  showUpdateDocumentoS:boolean=false
  constructor(public tareaService:TareasService,
    public contratosService:ContratosService,
    public documentosEntradaService:DocumentosEntradaService,
    public documentosSalidaService:DocumentosSalidaService,
    public tareaDocumentosSalidaService:TareaDocumentosSalidaService) { }

  ngOnInit(): void {
    this.tareaService.getTareas(1,"").subscribe((data:any)=>{
      this.listaTareas=data.tareas.docs
    })

    this.contratosService.getContratos(1,"").subscribe((data:any)=>{
      this.listaContrato=data.contratos.docs
    })

    this.documentosSalidaService.getDocumentosSalida().subscribe((data:any)=>{
      this.listaDocumentosSalida= data.documentos_salida
    })

    this.tareaDocumentosSalidaService.getTareaDocumentosSalida("","").subscribe((data:any)=>{
      this.listaTareaDocumentosSalida=data.tarea_documentos_salida
    })
  }

  refreshDocumentosSalida(){
    this.documentosSalidaService.getDocumentosSalida().subscribe((data:any)=>{
      this.listaDocumentosSalida= data.documentos_salida
    })
  }

  refreshTareaDocumentosSalida(){
    this.tareaDocumentosSalidaService.getTareaDocumentosSalida("","").subscribe((data:any)=>{
      this.listaTareaDocumentosSalida=data.tarea_documentos_salida
    })
  }

  addDocumentoSalidaTC(){
    let tarea:any=document.querySelector("#tareaC")
    let documento_salida:any=document.querySelector("#documentoSalidaC")
    let contrato:any=document.querySelector("#contratoC")

    let dataDocumentoTC:any={
      tarea:tarea.value,
      documento_salida:documento_salida.value,
      contrato:contrato.value
    }

    this.tareaDocumentosSalidaService.addTareaDocumentosSalida(dataDocumentoTC).subscribe((data:any)=>{
      this.refreshTareaDocumentosSalida()
      this.closeModalDocumentoSalidaCT()
    })

  }

  editDocumentoSalidaTC(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateDocumentoSTC=true

    let tarea:any=document.querySelector("#tareaC")
    let documento_salida:any=document.querySelector("#documentoSalidaC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoDSTC")
    let id:any=document.querySelector("#id_documento_s_tc")
    tarea.value=data.tarea._id
    documento_salida.value=data.documento_salida._id
    contrato.value=data.contrato._id
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    this.openModalDocumentoSalidaCT()
  }

  updateDocumentoSalidaTC(){
    let tarea:any=document.querySelector("#tareaC")
    let documento_salida:any=document.querySelector("#documentoSalidaC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoDSTC")
    let id:any=document.querySelector("#id_documento_s_tc")

    let dataDocumentoSTC:any={
      tarea:tarea.value,
      documento_salida:documento_salida.value,
      contrato:contrato.value,
      estado:estado.value,
      id:id.value
    }

    this.tareaDocumentosSalidaService.updateTareaDocumentosSalida(dataDocumentoSTC).subscribe((data:any)=>{
      this.refreshTareaDocumentosSalida()
      this.closeModalDocumentoSalidaCT()
    })
  }

  addDocumentoSalida(){
    let descripcion:any=document.querySelector("#nombre_documento")
    let tipo_documento:any=document.querySelector("#tipo_documento")

    let dataDocumentoSalida:any={
      tipo_documento:tipo_documento.value,
      requerido:true,
      descripcion:descripcion.value,
    }

    console.log(dataDocumentoSalida)

    this.documentosSalidaService.addDocumentoSalida(dataDocumentoSalida).subscribe((data:any)=>{
      this.refreshDocumentosSalida()
      this.closeModalDocumentoSalida()
    })

  }

  editDocumentoSalida(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateDocumentoS=true
    let descripcion:any=document.querySelector("#nombre_documento")
    let tipo_documento:any=document.querySelector("#tipo_documento")
    let estado:any=document.querySelector("#estadoDS")
    let id:any=document.querySelector("#id_documento_s")
    descripcion.value=data.descripcion
    tipo_documento.value=data.tipo_documento
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    this.openModalDocumentoSalida()
  }

  updateDocumentoSalida(){
    let descripcion:any=document.querySelector("#nombre_documento")
    let tipo_documento:any=document.querySelector("#tipo_documento")
    let estado:any=document.querySelector("#estadoDS")
    let id:any=document.querySelector("#id_documento_s")

    let dataDocumentoSalida:any={
      tipo_documento:tipo_documento.value,
      descripcion:descripcion.value,
      estado:estado.value,
      id:id.value
    }

    this.documentosSalidaService.updateDocumentoSalida(dataDocumentoSalida).subscribe((data:any)=>{
      this.refreshDocumentosSalida()
      this.closeModalDocumentoSalida()
    })
  }

  openModalDocumentoSalidaCT(){
    this.showModalDocumentoSalidaTC=true;
  }

  openModalDocumentoSalida(){
    this.showModalDocumentoSalida=true;
  }

  closeModalDocumentoSalidaCT(){
    this.showModalDocumentoSalidaTC=false;
    this.showUpdateDocumentoSTC=false
    this.resetFormDSTC()
  }

  closeModalDocumentoSalida(){
    this.showModalDocumentoSalida=false;
    this.showUpdateDocumentoS=false
    this.resetFormDS()
  }

  resetFormDSTC(){
    let tarea:any=document.querySelector("#tareaC")
    let documento_salida:any=document.querySelector("#documentoSalidaC")
    let contrato:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoDETC")
    let id:any=document.querySelector("#id_documento_e_tc")
    tarea.value=""
    documento_salida.value=""
    contrato.value=""
    estado.value=""
    id.value=""
  }

  resetFormDS(){
    let descripcion:any=document.querySelector("#nombre_documento")
    let tipo_documento:any=document.querySelector("#tipo_documento")
    let estado:any=document.querySelector("#estadoDS")
    let id:any=document.querySelector("#id_documento_s")
    descripcion.value=""
    tipo_documento.value=""
    estado.value=""
    id.value=""
  }

}
