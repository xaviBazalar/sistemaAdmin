import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { ActivatedRoute } from '@angular/router';
import { HistorialResultadoSolicitudService } from '../../services/historial-resultado-solicitud.service';
import { TareaDocumentosEntradaService } from '../../services/tarea-documentos-entrada.service';


@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit {

  solicitud:any;
  listaHistorialResultadoSolicitud:any;
  listaTareaDocumentos:any;
  tarea:any;

  constructor(
    public solicitudService:SolicitudesService,
    public historialSolicitudService:HistorialResultadoSolicitudService,
    public tareaDocumentosService:TareaDocumentosEntradaService,
    public _route:ActivatedRoute) {
    let idSolicitud:string|null=this._route.snapshot.paramMap.get("id");
    this.solicitudService.getSolicitud(idSolicitud).subscribe((data:any)=>{
      this.solicitud=data.solicitudes[0];
      this.tarea=data.solicitudes[0].tarea._id;
      this.getTareaDocumentosEntrada(this.tarea)
    })

    this.historialSolicitudService.getHistorialResultadoSolicitud(idSolicitud).subscribe((data:any)=>{
      this.listaHistorialResultadoSolicitud=data.historial_resultado_solicitud;
    })
   }

  ngOnInit(): void {
    
  }

  getTareaDocumentosEntrada(tarea:string) {
    this.tareaDocumentosService.getTareaDocumentosEntrada(tarea).subscribe((data:any)=>{
      this.listaTareaDocumentos=data.tarea_documentos_entrada;
    })
  }

}
