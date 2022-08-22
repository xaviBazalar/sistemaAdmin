import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TareaDocumentosEntradaService } from '../../services/tarea-documentos-entrada.service';
import { HistorialResultadoSolicitudService } from '../../services/historial-resultado-solicitud.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { UsuariosService } from '../../services/usuarios.service';
import { EstadosSolicitudService } from '../../services/estados-solicitud.service';

@Component({
  selector: 'app-ver-solicitud-gst',
  templateUrl: './ver-solicitud-gst.component.html',
  styleUrls: ['./ver-solicitud-gst.component.css']
})
export class VerSolicitudGstComponent implements OnInit {

  solicitud:any;
  listaHistorialResultadoSolicitud:any;
  listaTareaDocumentos:any;
  tarea:any;
  loaded:boolean=false;
  listaUsuarios:any;
  listaUsuariosGST:any=[];
  listaUsuariosBKO:any=[];
  listaSolicitudes:any;
  constructor(
    public solicitudService:SolicitudesService,
    public historialSolicitudService:HistorialResultadoSolicitudService,
    public tareaDocumentosService:TareaDocumentosEntradaService,
    public usuariosService:UsuariosService,
    public estadosService:EstadosSolicitudService,
    public _route:ActivatedRoute) {
      this.usuariosService.getUsuarios().subscribe((data:any)=>{
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

      this.estadosService.getSolicitudes().subscribe((data:any)=>{
        this.listaSolicitudes=data.estadoSolicitudes;
      })
   }

  async ngOnInit(): Promise<void> {
    let idSolicitud:string|null=this._route.snapshot.paramMap.get("id");
    const dataSolicitud :any = await this.solicitudService.getSolicitud(idSolicitud).toPromise();
    this.solicitud=dataSolicitud.solicitudes[0];
    this.tarea=dataSolicitud.solicitudes[0]?.tarea._id;
    this.getTareaDocumentosEntrada(this.tarea)

    const dataHistoria:any = await this.historialSolicitudService.getHistorialResultadoSolicitud(idSolicitud).toPromise();
    this.listaHistorialResultadoSolicitud=dataHistoria.historial_resultado_solicitud;
    this.loaded=true;

    
  }

  validarEstado(estado:string,estado_validacion:string){
    if(estado==estado_validacion){
      return true
    }else{
      return false
    }
  }


  getTareaDocumentosEntrada(tarea:string) {
    this.tareaDocumentosService.getTareaDocumentosEntrada(tarea).subscribe((data:any)=>{
      this.listaTareaDocumentos=data.tarea_documentos_entrada;
    })
  }
}
