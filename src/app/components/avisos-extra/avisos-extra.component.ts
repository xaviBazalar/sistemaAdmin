import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratosService } from '../../services/contratos.service';
import { AvisosExtraService } from '../../services/avisos-extra.service';


@Component({
  selector: 'app-avisos-extra',
  templateUrl: './avisos-extra.component.html',
  styleUrls: ['./avisos-extra.component.css']
})
export class AvisosExtraComponent implements OnInit {

  showModalUsuarioExtra:boolean=false
  showModalContratosUsuario:boolean=false
  showUpdateU:boolean=false
  listaUsuarios:any=[];
  listaContrato:any=[];
  listaUsuariosAvisos:any=[];
  listaContratosUsuarioAvisos:any=[];
  validacionFormC:boolean=false
  emailTemp:string=""
  pagAvisosExtra:any={
    hasNextPage:false,
    hasPrevPage:false,
    totalPages:[],
    page:0
  }
  @ViewChild("pagAvisosExtra",{static:false}) paginadorAvisosExtra:any;

  constructor(
    public contratosService:ContratosService,
    public avisosExtraService:AvisosExtraService
    ) { 
    
  }



  ngOnInit(): void {
    this.contratosService.getContratos(1,"").subscribe((data:any)=>{
      this.listaContrato=data.contratos.docs
    })

    this.avisosExtraService.getAvisosExtra("").subscribe((data:any)=>{
      this.listaUsuariosAvisos=data.avisos_extra
    })
  }

  verContratoAviso(email:string=""){
    console.log(email)
  }

  refreshListaContratos(pagina:any=1,extraParams:any=""){
    this.contratosService.getContratos(pagina,extraParams).subscribe((data:any)=>{
      this.listaContrato=data.contratos.docs
    })
  }

  filterContratos(){
    let contrato:any=document.querySelector("#NcontratoC")
    let dataFilter=`n_contrato=${contrato.value}`
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

  refreshLista(e:any){
    this.avisosExtraService.getAvisosExtra("").subscribe((data:any)=>{
      this.listaUsuariosAvisos=data.avisos_extra
    })
  }

  editUsuarioContratoAviso(e:any){
    this.showUpdateU=true
    this.showModalUsuarioExtra=true
    let correo_usuario:any=document.querySelector("#correo_usuario")
    correo_usuario.value=e
    this.emailTemp=e
  }

  updateUsuarioExtra(){
    //this.emailTemp
    let correo_usuario:any=document.querySelector("#correo_usuario")
    let dataUpdate={
      email_old:this.emailTemp.trim(),
      email_new:correo_usuario.value.toLowerCase().trim(),
    }

    this.avisosExtraService.updateAvisoExtra(dataUpdate).subscribe((data:any)=>{
      this.closeModalUsuarioExtra()
      this.refreshLista(1)
    })
  }

  addUsuarioExtra(){
    let nombre_usuario:any=document.querySelector("#nombre_usuario")
    let correo_usuario:any=document.querySelector("#correo_usuario")
    let contrato:any=document.querySelector("#contratoC")

    let dataSend={
      nombre:nombre_usuario.value.trim(),
      email:correo_usuario.value.toLowerCase().trim(),
      contrato:contrato.value
    }

    if( dataSend.email=="" || dataSend.contrato==""){
      this.validacionFormC=true
    }

    this.validacionFormC=false

    this.avisosExtraService.addAvisoExtra(dataSend).subscribe((data:any)=>{
      this.closeModalUsuarioExtra()
    })

  }

  showContratosAvisoUser(email:string){
    this.avisosExtraService.getAvisosExtra(`email=${email}`).subscribe((data:any)=>{
      this.listaContratosUsuarioAvisos=data.avisos_extra
      this.showModalContratosUsuario=true
    })
  }

  closeModalContratoUsuarioExtra(){
    this.showModalContratosUsuario=false
  }

  openModalUsuarioExtra(){
    this.showModalUsuarioExtra=true
  }

  closeModalUsuarioExtra(){
    this.showModalUsuarioExtra=false
    this.showUpdateU=false
    let correo_usuario:any=document.querySelector("#correo_usuario")
    correo_usuario.value=""
    this.emailTemp=""
  }
}
