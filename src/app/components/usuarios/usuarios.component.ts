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

    let dataUsuario:any={
      nombre:nombre.value,
      correo:correo.value,
      login:login.value,
      password:password.value,
      estado:true,
      perfil:perfil.value
    }

    this.usuariosService.addUsuario(dataUsuario).subscribe((data:any)=>{
      this.refreshUsuarios()
      this.closeModalUsuario()
    })

  }

  openModalUsuario(){
    this.showModalUsuario=true;
  }

  closeModalUsuario(){
    this.showModalUsuario=false;
  }


}
