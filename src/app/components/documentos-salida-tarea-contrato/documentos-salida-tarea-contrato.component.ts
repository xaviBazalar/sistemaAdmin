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
  constructor(public tareaService:TareasService,
    public contratosService:ContratosService,
    public documentosEntradaService:DocumentosEntradaService,
    public documentosSalidaService:DocumentosSalidaService,
    public tareaDocumentosSalidaService:TareaDocumentosSalidaService) { }

  ngOnInit(): void {
    this.tareaService.getTareas().subscribe((data:any)=>{
      this.listaTareas=data.tareas
    })

    this.contratosService.getContratos().subscribe((data:any)=>{
      this.listaContrato=data.contratos
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

  openModalDocumentoSalidaCT(){
    this.showModalDocumentoSalidaTC=true;
  }

  openModalDocumentoSalida(){
    this.showModalDocumentoSalida=true;
  }

  closeModalDocumentoSalidaCT(){
    this.showModalDocumentoSalidaTC=false;
  }

  closeModalDocumentoSalida(){
    this.showModalDocumentoSalida=false;
  }

}
