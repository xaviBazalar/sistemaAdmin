import { Component, OnInit } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { ContratosService } from '../../services/contratos.service';
import { DocumentosEntradaService } from '../../services/documentos-entrada.service';
import { DocumentosSalidaService } from '../../services/documentos-salida.service';
import { TareaDocumentosSalidaService } from '../../services/tarea-documentos-salida.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { PerfilesService } from '../../services/perfiles.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  listaDocumentosSalida:any=[];
  listaTareaDocumentosSalida:any=[];
  listaTareas:any=[];
  listaContrato:any=[];
  listaUsuarios:any=[];
  listaPerfiles:any=[]

  usuario:{
    _id:string|null,
    perfil:any
  }  =JSON.parse(localStorage.getItem("usuario") || '{}');

  showModalUsuario:boolean=false
  showUpdateU:boolean=false
  constructor(
    public tareaService:TareasService,
    public contratosService:ContratosService,
    public documentosEntradaService:DocumentosEntradaService,
    public documentosSalidaService:DocumentosSalidaService,
    public tareaDocumentosSalidaService:TareaDocumentosSalidaService,
    public usuariosService:UsuariosService,
    public perfilesService:PerfilesService
  ) { }

  ngOnInit(): void {
    
    this.usuariosService.getUsuarios().subscribe((data:any)=>{
      this.listaUsuarios=data.usuarios
    })

    this.perfilesService.getPerfiles().subscribe((data:any)=>{
      this.listaPerfiles=data.perfiles
    })
  }

  refreshUsuarios(){
    this.usuariosService.getUsuarios().subscribe((data:any)=>{
      this.listaUsuarios=data.usuarios
    })
  }

  addUsuario(){
    let nombre:any=document.querySelector("#nombre_usuario")
    let correo:any=document.querySelector("#correo_usuario")
    let login:any=document.querySelector("#login_usuario")
    let password:any=document.querySelector("#clave_usuario")
    let perfil:any=document.querySelector("#perfil_usuario")
    let autorizar:any=document.querySelector("#autorizar")

    let dataUsuario:any={
      nombre:nombre.value,
      correo:correo.value,
      login:login.value,
      password:password.value,
      estado:true,
      perfil:perfil.value,
      autorizar:autorizar.value
    }

    this.usuariosService.addUsuario(dataUsuario).subscribe((data:any)=>{
      this.refreshUsuarios()
      this.closeModalUsuario()
    })

  }

  editUsuario(info:any){
    let data=JSON.parse(info.target.getAttribute("data"))
    this.showUpdateU=true
    let nombre:any=document.querySelector("#nombre_usuario")
    let correo:any=document.querySelector("#correo_usuario")
    let login:any=document.querySelector("#login_usuario")
    let password:any=document.querySelector("#clave_usuario")
    let perfil:any=document.querySelector("#perfil_usuario")
    let estado:any=document.querySelector("#estadoU")
    let autorizar:any=document.querySelector("#autorizar")
    let id:any=document.querySelector("#id_usuario")
    

    nombre.value=data.nombre
    correo.value=data.correo
    login.value=data.login
    password.value=data.password
    perfil.value=data.perfil._id
    estado.value=(data.estado)?"1":"0"
    id.value=data._id
    autorizar=(data.autorizar)?"1":"0"
    this.openModalUsuario()
  }

  updateUsuario(){
    let nombre:any=document.querySelector("#nombre_usuario")
    let correo:any=document.querySelector("#correo_usuario")
    let login:any=document.querySelector("#login_usuario")
    let password:any=document.querySelector("#clave_usuario")
    let perfil:any=document.querySelector("#perfil_usuario")
    let autorizar:any=document.querySelector("#autorizar")
    let estado:any=document.querySelector("#estadoU")
    let id:any=document.querySelector("#id_usuario")

    let dataUpdate:any={
      nombre:nombre.value,
      correo:correo.value,
      login:login.value,
      perfil:perfil.value,
      autorizar:autorizar.value,
      estado:estado.value,
      id:id.value
    }

    if(password.value!==undefined){
      dataUpdate.password=password.value
    }

    this.usuariosService.updateUsuario(dataUpdate).subscribe((data:any)=>{
      this.refreshUsuarios()
      this.closeModalUsuario()
    })
  }

  openModalUsuario(){
    this.showModalUsuario=true;
  }

  closeModalUsuario(){
    this.showModalUsuario=false;
    this.showUpdateU=false
    this.resetFormU()
  }

  resetFormU(){
    let nombre:any=document.querySelector("#nombre_usuario")
    let correo:any=document.querySelector("#correo_usuario")
    let login:any=document.querySelector("#login_usuario")
    let password:any=document.querySelector("#clave_usuario")
    let perfil:any=document.querySelector("#perfil_usuario")
    let estado:any=document.querySelector("#estadoU")
    let id:any=document.querySelector("#id_usuario")
    nombre.value=""
    correo.value=""
    login.value=""
    password.value=""
    perfil.value=""
    estado.value=""
    id.value=""
  }


}
