import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit {

  solicitud:any;

  constructor(
    public solicitudService:SolicitudesService,
    public _route:ActivatedRoute) {
    let idSolicitud:string|null=this._route.snapshot.paramMap.get("id");
    this.solicitudService.getSolicitud(idSolicitud).subscribe((data:any)=>{
      
      this.solicitud=data.solicitudes[0];
      //console.log(this.solicitud)
    })
   }

  ngOnInit(): void {



  }

}
