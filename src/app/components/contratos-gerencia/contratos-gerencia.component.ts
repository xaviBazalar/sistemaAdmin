import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { SolitudesUsuarioService } from '../../services/solitudes-usuario.service';
import { TareasService } from '../../services/tareas.service';
import { ContratosService } from '../../services/contratos.service';
import { TareasContratoService } from '../../services/tareas-contrato.service';
import { ContratosGerenciaService } from '../../services/contratos-gerencia.service';
import { GerenciasService } from '../../services/gerencias.service';
import { PaginadorComponent } from '../paginador/paginador.component';

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
  showModalDelete:boolean=false

  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');

  pagContratos:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  pagGerencia:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  pagContratosGerencia:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }

  @ViewChild("pagContratosGerencia") child:any;
  @ViewChild("pagGerencia",{static:false}) paginadorGerencia:any;

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
    ) { 
      
    }

  async ngOnInit(): Promise<void> {
    this.tareaService.getTareas(1,"").subscribe((data:any)=>{
      this.listaTareas=data.tareas.docs
    })

    

    this.contratosService.getContratos(1,"").subscribe((data:any)=>{
      this.pagContratos.hasNextPage=data.contratos.hasNextPage
      this.pagContratos.hasPrevPage=data.contratos.hasPrevPage
      this.pagContratos.totalPages=new Array(data.contratos.totalPages)
      this.pagContratos.page=data.contratos.page
      this.listaContrato=data.contratos.docs
    })
    

    let resultsCG:any = await this.contratosGerenciaService.getContratosGerencia(1,"","").toPromise();
    this.pagContratosGerencia.hasNextPage=resultsCG.contratos_gerencia.hasNextPage
    this.pagContratosGerencia.hasPrevPage=resultsCG.contratos_gerencia.hasPrevPage
    this.pagContratosGerencia.totalPages=new Array(resultsCG.contratos_gerencia.totalPages)
    this.pagContratosGerencia.page=resultsCG.contratos_gerencia.page
    this.listaContratosGerencia=resultsCG.contratos_gerencia.docs

    this.child.pagParams=this.pagContratosGerencia
    
    this.gerenciasService.getGerencias(1,1).subscribe((data:any)=>{
      this.pagGerencia.hasNextPage=data.gerencias.hasNextPage
      this.pagGerencia.hasPrevPage=data.gerencias.hasPrevPage
      this.pagGerencia.totalPages=new Array(data.gerencias.totalPages)
      this.pagGerencia.page=data.gerencias.page
      this.listaGerencias=data.gerencias.docs
      this.paginadorGerencia.pagParams=this.pagGerencia
    })
  }

  filterContratosGerencia(){
    let contrato:any=document.querySelector("#searchContrato")
    let gerencia:any=document.querySelector("#searchGerencia")
    let dataFilter="n_contrato="+contrato.value.replaceAll("&","amp;")+"&n_gerencia="+gerencia.value

    this.contratosGerenciaService.getContratosGerencia(1,"",dataFilter).subscribe((data:any)=>{
      this.pagContratosGerencia.hasNextPage=data.contratos_gerencia.hasNextPage
      this.pagContratosGerencia.hasPrevPage=data.contratos_gerencia.hasPrevPage
      this.pagContratosGerencia.totalPages=new Array(data.contratos_gerencia.totalPages)
      this.pagContratosGerencia.page=data.contratos_gerencia.page
      this.listaContratosGerencia=data.contratos_gerencia.docs
    })
  }

  filterGerencia(){
    let gerencia:any=document.querySelector("#searchGerenciaG")
    let dataFilter="n_gerencia="+gerencia.value
    this.gerenciasService.getGerenciasFilter(1,1,dataFilter).subscribe((data:any)=>{
      this.pagGerencia.hasNextPage=data.gerencias.hasNextPage
      this.pagGerencia.hasPrevPage=data.gerencias.hasPrevPage
      this.pagGerencia.totalPages=new Array(data.gerencias.totalPages)
      this.pagGerencia.page=data.gerencias.page
      this.listaGerencias=data.gerencias.docs
      this.paginadorGerencia.pagParams=this.pagGerencia
    })
  }

  filterContrato(){
    let contrato:any=document.querySelector("#searchContratoG")
    let dataFilter="n_contrato="+contrato.value.replaceAll("&","amp;")
    this.contratosService.getContratos(1,dataFilter).subscribe((data:any)=>{
      this.pagContratos.hasNextPage=data.contratos.hasNextPage
      this.pagContratos.hasPrevPage=data.contratos.hasPrevPage
      this.pagContratos.totalPages=new Array(data.contratos.totalPages)
      this.pagContratos.page=data.contratos.page
      this.listaContrato=data.contratos.docs
    })
  }

  refreshLista(info:any,tipo:string){
    if(tipo=="ContratosGerencia"){
      this.refreshListaContratosGerencia(info)
    }else if(tipo=="Gerencia"){
      this.refreshListaGerencia(info)
    }
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

  filterContratosFromTC(){
    let contrato:any=document.querySelector("#NcontratoC")
    let dataFilter=`n_contrato=${contrato.value}`
    this.refreshListaContratos(1,dataFilter)
  }

  refreshListaGerencia(page:string|number){
    this.gerenciasService.getGerencias(page,1).subscribe((data:any)=>{
      this.pagGerencia.hasNextPage=data.gerencias.hasNextPage
      this.pagGerencia.hasPrevPage=data.gerencias.hasPrevPage
      this.pagGerencia.totalPages=new Array(data.gerencias.totalPages)
      this.pagGerencia.page=data.gerencias.page
      this.listaGerencias=data.gerencias.docs
      this.paginadorGerencia.pagParams=this.pagGerencia
    })
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

  refreshListaContratosGerencia(page:any=1,extraParams:any=""){
    this.contratosGerenciaService.getContratosGerencia(page,"",extraParams).subscribe((data:any)=>{
      this.pagContratosGerencia.hasNextPage=data.contratos_gerencia.hasNextPage
      this.pagContratosGerencia.hasPrevPage=data.contratos_gerencia.hasPrevPage
      this.pagContratosGerencia.totalPages=new Array(data.contratos_gerencia.totalPages)
      this.pagContratosGerencia.page=data.contratos_gerencia.page
      this.listaContratosGerencia=data.contratos_gerencia.docs
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
    let contrato:any=document.querySelector("#NcontratoC")
    let contratoID:any=document.querySelector("#contratoC")
    let estado:any=document.querySelector("#estadoCG")
    let id:any=document.querySelector("#id_cg")
    gerencia.value=data.gerencia._id
    contrato.value=data.contrato.contrato+"-"+data.contrato.contradoid//data.contrato._id
    contratoID.value=data.contrato._id
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
      this.refreshListaGerencia(1)
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
      this.refreshListaGerencia(1)
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
    let contratoID:any=document.querySelector("#NcontratoC")
    let estado:any=document.querySelector("#estadoCG")
    let id:any=document.querySelector("#id_cg")

    gerencia.value=""
    contrato.value=""
    contratoID.value=""
    estado.value=""
    id.value=""
    this.refreshListaContratos(1,"")
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
    if(tipoDelete.value=="contrato-gerencia"){
      this.deleteContratoGerencia(inputDelete.value)
    }

    if(tipoDelete.value=="contrato"){
      this.deleteContrato(inputDelete.value)
    }
    
    if(tipoDelete.value=="gerencia"){
      this.deleteGerencia(inputDelete.value)
    }
  }

  deleteContratoGerencia(id:string){
    let inputDelete:any=document.querySelector("#idDelete")
    inputDelete.value=""
    let params:any={
      id:id
    }

    this.contratosGerenciaService.deleteContratoGerencia(params).subscribe((data:any) => {
      this.refreshListaContratosGerencia(1)
      this.closeModalDelete()
    });
  }

  deleteContrato(id:string){
    let inputDelete:any=document.querySelector("#idDelete")
    inputDelete.value=""
    let params:any={
      id:id
    }

    this.contratosService.deleteContrato(params).subscribe((data:any) => {
      this.refreshListaContratos(1)
      this.closeModalDelete()
    });
  }

  deleteGerencia(id:string){
    let inputDelete:any=document.querySelector("#idDelete")
    inputDelete.value=""
    let params:any={
      id:id
    }

    this.gerenciasService.deleteGerencia(params).subscribe((data:any) => {
      this.refreshListaGerencia(1)
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
