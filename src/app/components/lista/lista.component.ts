import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  listaSolicitudes:any=[];
  constructor(
    public solicitudService:SolicitudesService,
  ) { }

  ngOnInit(): void {
    this.solicitudService.getSolicitudes(1,0).subscribe((data:any)=>{
      this.listaSolicitudes=data.solicitudes.docs;
    })
  }

}
