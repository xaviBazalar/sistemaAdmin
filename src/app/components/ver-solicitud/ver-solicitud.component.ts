import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { ActivatedRoute } from '@angular/router';
import { HistorialResultadoSolicitudService } from '../../services/historial-resultado-solicitud.service';
import { TareaDocumentosEntradaService } from '../../services/tarea-documentos-entrada.service';
import { TareaDocumentosSalidaService } from '../../services/tarea-documentos-salida.service';
import { environment } from '../../../environments/environment.prod';


@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit {
  baseUrlGet:string=environment.baseUrlGet;
  solicitud:any;
  listaHistorialResultadoSolicitud:any;
  listaTareaDocumentos:any;
  listaTareaDocumentosSalida:any;
  tarea:any;
  loaded:boolean=false;
  id_solicitud:string|null  ="";
  usuario:string|null  ="";

  constructor(
    public solicitudService:SolicitudesService,
    public historialSolicitudService:HistorialResultadoSolicitudService,
    public tareaDocumentosService:TareaDocumentosEntradaService,
    public tareaDocumentosSalidaService:TareaDocumentosSalidaService,
    public _route:ActivatedRoute) {

   }

  async ngOnInit(): Promise<void> {
    let idSolicitud:string|null=this._route.snapshot.paramMap.get("id");
    this.id_solicitud=this._route.snapshot.paramMap.get("id");
    const dataSolicitud :any = await this.solicitudService.getSolicitud(idSolicitud).toPromise();
    this.solicitud=dataSolicitud.solicitudes[0];
    this.tarea=dataSolicitud.solicitudes[0]?.tarea._id;
    this.getTareaDocumentosEntrada(this.tarea)
    this.getTareaDocumentosSalida(this.tarea)

    const dataHistoria:any = await this.historialSolicitudService.getHistorialResultadoSolicitud(idSolicitud).toPromise();
    this.listaHistorialResultadoSolicitud=dataHistoria.historial_resultado_solicitud;
    this.loaded=true;
  }


  getTareaDocumentosEntrada(tarea:string) {
    this.tareaDocumentosService.getTareaDocumentosEntrada(tarea).subscribe((data:any)=>{
      this.listaTareaDocumentos=data.tarea_documentos_entrada;
    })
  }

  getTareaDocumentosSalida(tarea:string) {
    this.tareaDocumentosSalidaService.getTareaDocumentosSalida(tarea).subscribe((data:any)=>{
      this.listaTareaDocumentosSalida=data.tarea_documentos_salida;
    })
  }

  addHistorialSolicitud(){
    let mensaje:any=document.querySelector("#msjInteradcion")
    let usuario:any | null= JSON.parse(sessionStorage.getItem("usuario") || '{}');
    let dataHistorial:any={
      "solicitud": this.id_solicitud,
      "estado_resultado":this.solicitud.estado_resultado._id,
      "usuario": usuario._id,
      "mensaje": mensaje.value
    }

    this.historialSolicitudService.addHistorialResultadoSolicitud(dataHistorial).subscribe((data:any)=>{
      this.refreshHistorialSolicitud()
    })
    
  }

  refreshHistorialSolicitud(){
    this.historialSolicitudService.getHistorialResultadoSolicitud(this.id_solicitud).subscribe((data:any)=>{
      this.listaHistorialResultadoSolicitud=data.historial_resultado_solicitud;
    });
  }

}
