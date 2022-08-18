import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css']
})
export class MisSolicitudesComponent implements OnInit {

  listaSolicitudes:any;
  constructor(public solicitudService:SolicitudesService) { }
//getSolicitudes
  ngOnInit(): void {
    this.solicitudService.getSolicitudes().subscribe((data:any)=>{
      this.listaSolicitudes=data.solicitudes;
    })
  }

}
