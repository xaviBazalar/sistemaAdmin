import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolitudesUsuarioService } from '../../services/solitudes-usuario.service';
import { TareasService } from '../../services/tareas.service';
import { ContratosService } from '../../services/contratos.service';
import { TareasContratoService } from '../../services/tareas-contrato.service';
import { UsuariosService } from '../../services/usuarios.service';

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
  listaTareasActivas:any=[];
  listaContrato:any=[];
  listaContratoActivas:any=[];
  listaTareasContrato:any=[];

  listaUsuariosGST:any=[];
  listaUsuariosBKO:any=[];
  listaUsuariosADC:any=[];

  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');

  showModalContrato:boolean=false
  showModalTarea:boolean=false
  showModalTareaContrato:boolean=false
  showUpdate:boolean=false
  showUpdateTarea:boolean=false
  showUpdateContrato:boolean=false
  pagContratos:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  pagTareas:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  pagTareasContrato:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  constructor(
    public solicitudService:SolicitudesService,
    public solicitudUsuarioService:SolitudesUsuarioService,
    public tareaService:TareasService,
    public contratosService:ContratosService,
    public tareasContratoService:TareasContratoService,
    public usuariosService:UsuariosService
    ) { 

    }

  ngOnInit(): void {

    this.usuariosService.getUsuarios().subscribe((data:any)=>{
      
      for (const usuario of data.usuarios) {
        if(usuario.perfil.sigla=="GST" || usuario.perfil.sigla=="GST-SUP"){
          this.listaUsuariosGST.push(usuario)
        }

        if(usuario.perfil.sigla=="BKO"){
          this.listaUsuariosBKO.push(usuario)
        }

        if(usuario.perfil.sigla=="ADC"){
          this.listaUsuariosADC.push(usuario)
        }
      }
    })

    this.tareaService.getTareas(1,"").subscribe((data:any)=>{
      this.listaTareas=data.tareas.docs
      this.pagTareas.hasNextPage=data.tareas.hasNextPage
      this.pagTareas.hasPrevPage=data.tareas.hasPrevPage
      this.pagTareas.totalPages=new Array(data.tareas.totalPages)
      this.pagTareas.page=data.tareas.page
      this.listaTareasActivas=[]
      for (const tarea of data.tareas.docs) {
        if(tarea.estado==true || tarea.estado==1){
          this.listaTareasActivas.push(tarea)
        }
      }
    })

    this.contratosService.getContratos(1,"").subscribe((data:any)=>{
      this.pagContratos.hasNextPage=data.contratos.hasNextPage
      this.pagContratos.hasPrevPage=data.contratos.hasPrevPage
      this.pagContratos.totalPages=new Array(data.contratos.totalPages)
      this.pagContratos.page=data.contratos.page

      this.listaContrato=data.contratos.docs
      this.listaContratoActivas=[]
      for (const contrato of data.contratos.docs) {
        if(contrato.estado==true || contrato.estado==1){
          this.listaContratoActivas.push(contrato)
        }
      }
    })

    this.tareasContratoService.getTareasContrato(1,"").subscribe((data:any)=>{
      this.pagTareasContrato.hasNextPage=data.contratos.hasNextPage
      this.pagTareasContrato.hasPrevPage=data.contratos.hasPrevPage
      this.pagTareasContrato.totalPages=new Array(data.contratos.totalPages)
      this.pagTareasContrato.page=data.contratos.page
      this.listaTareasContrato=data.contratos.docs
    })
  }

  filterTareasContratos(){
    let contrato:any=document.querySelector("#searchContrato")
    let tarea:any=document.querySelector("#searchTarea")
    let dataFilter={
      contrato:"",
      n_contrato:contrato.value.replaceAll("&","amp;"),
      n_tarea:tarea.value
    }
    this.tareasContratoService.getTareasContratoFilter(dataFilter).subscribe((data:any)=>{
      this.listaTareasContrato=data.contratos.docs
    })
  }

  filterContratos(){
    let contrato:any=document.querySelector("#searchContratoC")
    let nroContrato:any=document.querySelector("#searchNroContratoC")
    let dataFilter=`n_contrato=${contrato.value.replaceAll("&","amp;")}&nro_contrato=${nroContrato.value}`
    this.refreshListaContratos(1,dataFilter)
  }

  filterContratosFromTC(){
    let contrato:any=document.querySelector("#NcontratoC")
    let dataFilter=`n_contrato=${contrato.value}`
    this.refreshListaContratos(1,dataFilter)
  }

  filterTareas(){
    let nombre_tarea:any=document.querySelector("#searchTareaC")
    let dataFilter=`nombre_tarea=${nombre_tarea.value}`
    this.refreshListaTareas(1,dataFilter)
  }

  refreshListaTareas(pagina:any=1,extraParams:any=""){
    this.tareaService.getTareas(pagina,extraParams).subscribe((data:any)=>{
      this.listaTareas=data.tareas.docs
      this.listaTareasActivas=[]
      for (const tarea of data.tareas.docs) {
        if(tarea.estado==true || tarea.estado==1){
          this.listaTareasActivas.push(tarea)
        }
      }
    })
  }

  refreshListaContratos(pagina:any=1,extraParams:any=""){
    this.contratosService.getContratos(pagina,extraParams).subscribe((data:any)=>{
      this.pagContratos.hasNextPage=data.contratos.hasNextPage
      this.pagContratos.hasPrevPage=data.contratos.hasPrevPage
      this.pagContratos.totalPages=new Array(data.contratos.totalPages)
      this.pagContratos.page=data.contratos.page

      this.listaContrato=data.contratos.docs
      this.listaContratoActivas=[]
      for (const contrato of data.contratos.docs) {
        if(contrato.estado==true || contrato.estado==1){
          this.listaContratoActivas.push(contrato)
        }
      }
    })
  }

  refreshListaTareasContrato(pagina:any=1){
    this.tareasContratoService.getTareasContrato(pagina,"").subscribe((data:any)=>{
      this.pagTareasContrato.hasNextPage=data.contratos.hasNextPage
      this.pagTareasContrato.hasPrevPage=data.contratos.hasPrevPage
      this.pagTareasContrato.totalPages=new Array(data.contratos.totalPages)
      this.pagTareasContrato.page=data.contratos.page
      this.listaTareasContrato=data.contratos.docs
    })
  }

  addTareaContrato(){
    let tarea:any=document.querySelector("#tareaC")
    let contrato:any=document.querySelector("#contratoC")
    let gst:any=document.querySelector("#usuarioGST")
    let bko:any=document.querySelector("#usuarioBKO")

    let dataContrato:any={
      tarea:tarea.value,
      contrato:contrato.value,
      gst:gst.value,
      bko:bko.value
    }

    this.tareasContratoService.addTareaContrato(dataContrato).subscribe((data:any)=>{
      this.closeModalTareaContrato()
      this.refreshListaTareasContrato(1)
    })
  }

  editTareaContrato(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdate=true

    let tarea:any=document.querySelector("#NtareaC")
    let contrato:any=document.querySelector("#NcontratoC")
    let tareaI:any=document.querySelector("#tareaC")
    let contratoI:any=document.querySelector("#contratoC")
    let gst:any=document.querySelector("#usuarioGST")
    let bko:any=document.querySelector("#usuarioBKO")
    let estado:any=document.querySelector("#estadoTC")
    let id:any=document.querySelector("#id_tarea_contrato")
    tarea.value=data.tarea.nombre_tarea
    tareaI.value=data.tarea._id
    contrato.value=data.contrato.contrato+"-"+data.contrato.contradoid
    contratoI.value=data.contrato._id
    gst.value=data.gst._id
    bko.value=data.bko._id
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    
    this.openModalTareaContrato()
  }

  editTarea(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateTarea=true

    let nombre_tarea:any=document.querySelector("#nombre_tarea")
    let frecuencia_tarea:any=document.querySelector("#frecuencia_tarea")
    let sla_tarea:any=document.querySelector("#sla_tarea")
    let estado:any=document.querySelector("#estadoT")
    let id:any=document.querySelector("#id_tarea")
    
    nombre_tarea.value=data.nombre_tarea
    frecuencia_tarea.value=data.frecuencia
    sla_tarea.value=data.SLA
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    
    this.openModalTarea()
  }

  editContrato(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateContrato=true

    let contrato:any=document.querySelector("#nombre_contrato")
    let contradoid:any=document.querySelector("#nro_contrato")
    let estado:any=document.querySelector("#estadoC")
    let adc:any=document.querySelector("#usuarioADC")
    let id:any=document.querySelector("#id_contrato")
    contrato.value=data.contrato
    contradoid.value=data.contradoid
    estado.value=(data.estado)?"1":"0"
    adc.value=(data.adc)?data.adc._id:""
    id.value=data._id
    
    this.openModalContrato()
  }

  updateTareaContrato(){
    let tarea:any=document.querySelector("#tareaC")
    let contrato:any=document.querySelector("#contratoC")
    let gst:any=document.querySelector("#usuarioGST")
    let bko:any=document.querySelector("#usuarioBKO")
    let estado:any=document.querySelector("#estadoTC")
    let id:any=document.querySelector("#id_tarea_contrato")

    let dataContrato:any={
      id:id.value,
      tarea:tarea.value,
      contrato:contrato.value,
      gst:gst.value,
      bko:bko.value,
      estado:estado.value
    }

    this.tareasContratoService.updateTareaContrato(dataContrato).subscribe((data:any)=>{
      this.closeModalTareaContrato()
      this.refreshListaTareasContrato(1)
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

  updateTarea(){
    
    let id:any=document.querySelector("#id_tarea")
    let nombre_tarea:any=document.querySelector("#nombre_tarea")
    let frecuencia_tarea:any=document.querySelector("#frecuencia_tarea")
    let sla_tarea:any=document.querySelector("#sla_tarea")
    let estado:any=document.querySelector("#estadoT")

    let dataTarea:any={
      id:id.value,
      nombre_tarea:nombre_tarea.value,
      frecuencia:frecuencia_tarea.value,
      SLA:sla_tarea.value,
      estado:estado.value
    }

    this.tareaService.updateTarea(dataTarea).subscribe((data:any)=>{
      this.closeModalTarea()
      this.refreshListaTareas()
    })
  }

  addContrato(){
    let contrato:any=document.querySelector("#nombre_contrato")
    let contradoid:any=document.querySelector("#nro_contrato")
    let adc:any=document.querySelector("#usuarioADC")
    
    let dataContrato:any={
      contradoid:contradoid.value,
      contrato:contrato.value,
      adc:adc.value
    }

    this.contratosService.addContrato(dataContrato).subscribe((data:any)=>{
      this.closeModalContrato()
      this.refreshListaContratos()
    })
  }

  updateContrato(){
    
    let id:any=document.querySelector("#id_contrato")
    let contrato:any=document.querySelector("#nombre_contrato")
    let contradoid:any=document.querySelector("#nro_contrato")
    let adc:any=document.querySelector("#usuarioADC")
    let estado:any=document.querySelector("#estadoC")

    let dataContrato:any={
      id:id.value,
      contradoid:contradoid.value,
      contrato:contrato.value,
      estado:estado.value,
      adc:adc.value
    }

    this.contratosService.updateContrato(dataContrato).subscribe((data:any)=>{
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
    this.showUpdate=false;
    this.resetFormTareaContrato()
  }

  closeModalTarea(){
    this.showUpdateTarea=false
    this.showModalTarea=false;
    this.resetFormTarea()
  }

  closeModalContrato(){
    this.showUpdateContrato=false
    this.showModalContrato=false;
    this.resetFormContrato()
  }

  resetFormTareaContrato(){
    let tarea:any=document.querySelector("#NtareaC")
    let tareaI:any=document.querySelector("#tareaC")
    let contrato:any=document.querySelector("#NcontratoC")
    let contratoI:any=document.querySelector("#contratoC")
    let gst:any=document.querySelector("#usuarioGST")
    let bko:any=document.querySelector("#usuarioBKO")
    let id:any=document.querySelector("#id_tarea_contrato")
    tarea.value=""
    contrato.value=""
    tareaI.value=""
    contratoI.value=""
    gst.value=""
    bko.value=""
    id.value=""

  }

  resetFormTarea(){
    let nombre_tarea:any=document.querySelector("#nombre_tarea")
    let frecuencia_tarea:any=document.querySelector("#frecuencia_tarea")
    let sla_tarea:any=document.querySelector("#sla_tarea")
    let id:any=document.querySelector("#id_tarea")
    nombre_tarea.value=""
    frecuencia_tarea.value=""
    sla_tarea.value=""
    id.value=""

  }

  resetFormContrato(){
    let contrato:any=document.querySelector("#nombre_contrato")
    let contradoid:any=document.querySelector("#nro_contrato")
    let id:any=document.querySelector("#id_contrato")
    contrato.value=""
    contradoid.value=""
    id.value=""
  }

  getTareasContrato({ target }:any) {
    let contratoI:any=document.querySelector("#contratoC")
    let contratoTxt=target.value;
    let idContrato:string=""
    for(let contrato of this.listaContratoActivas){
      if((contrato.contrato+"-"+contrato.contradoid)==contratoTxt.trim()){
        idContrato=contrato._id
      }
    } 

    contratoI.value=idContrato
  }

  getTarea({ target }:any) {
    let tareaI:any=document.querySelector("#tareaC")
    let tareaTxt=target.value;
    let idTarea:string=""
    for(let tarea of this.listaTareasActivas){
      if(tarea.nombre_tarea==tareaTxt){
        idTarea=tarea._id
      }
    } 

    tareaI.value=idTarea
  }

}
