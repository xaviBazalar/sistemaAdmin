import { Component, OnInit } from '@angular/core';
import { GerenciasService } from '../../services/gerencias.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { UsuariosService } from '../../services/usuarios.service';
import { TareasService } from '../../services/tareas.service';
import { EstadosSolicitudService } from '../../services/estados-solicitud.service';


@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit {

  listaGerencias:any;
  listaSolicitudes:any;
  listaUsuarios:any;
  listaUsuariosGST:any;
  listaUsuariosBKO:any;
  listatareas:any;
  
  

  constructor(public gerenciaService:GerenciasService,public estadosService:EstadosSolicitudService,public usuariosService:UsuariosService,public tareasServicio:TareasService) {
    this.listaUsuariosGST=[];
    this.listaUsuariosBKO=[];
   }

  ngOnInit(): void {

    this.gerenciaService.getGerencias().subscribe((data:any)=>{
      console.log(data)
      this.listaGerencias=data.gerencias;
    })

    this.estadosService.getSolicitudes().subscribe((data:any)=>{
      console.log(data)
      this.listaSolicitudes=data.estadoSolicitudes;
    })


    this.usuariosService.getUsuarios().subscribe((data:any)=>{
      console.log(data)
      this.listaUsuarios=data.usuarios;
      for (const usuario of data.usuarios) {
        if(usuario.perfil.sigla=="GST"){
          this.listaUsuariosGST.push(usuario)
        }

        if(usuario.perfil.sigla=="BKO"){
          this.listaUsuariosBKO.push(usuario)
        }
      }
    })

    this.tareasServicio.getTareas().subscribe((data:any)=>{
      console.log(data)
      this.listatareas=data.tareas;
     
    })


  }

}
